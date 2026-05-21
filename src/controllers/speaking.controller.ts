import { Request, Response, NextFunction } from "express"
import TestSession from "../models/TestSession.js"
import WritingQuestion from "../models/WritingQuestion.js"
import SpeakingQuestion from "../models/SpeakingQuestion.js"
import TestSet from "../models/TestSet.js"
import { uploadStudentSpeakingAudio } from "../utils/cloudinaryMedia.js"
import { gradingQueue } from "../queues/index.js"
import logger from "../utils/logger.js"
import { emitToUser } from "../sockets/emitter.js"
import { isActionAllowed } from "../utils/modeRules.js"
import { computeEffectiveMediaPolicy } from "../utils/mediaPolicy.js"

function positionInSpeakingFlow(taskNumber: number, sub: "A" | "B" | null): number {
  if (taskNumber < 5) return taskNumber
  if (taskNumber === 5) return sub === "B" ? 6 : 5
  return taskNumber + 1
}

/**
 * Save recorded speaking to Cloudinary and store URL on the session.
 */
export const saveRecording = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user.id as string
    const { testSetNumber, taskNumber, duration, subTask: bodySub } = req.body
    const file = (req as any).file

    if (!file || file.size === 0) {
      return res.status(400).json({ error: "No audio file provided or file is empty" })
    }

    const tn = Number(taskNumber)
    const normalizedSub: "A" | "B" | null =
      tn === 5 ? (String(bodySub).toUpperCase() === "B" ? "B" : "A") : null

    const audioUrl = await uploadStudentSpeakingAudio(
      file.buffer,
      studentId,
      Number(testSetNumber),
      tn,
      normalizedSub
    )

    let session = await TestSession.findOne({
      studentId,
      testSetNumber: Number(testSetNumber),
      status: "in_progress",
    })

    if (!session) return res.status(404).json({ error: "Session not found" })
    if (!session.instructionsAccepted) {
      return res.status(403).json({ error: "Instructions must be accepted before starting the test" })
    }
    const selectedModules = session.selectedModules || ["writing", "speaking"]
    if (!selectedModules.includes("speaking")) {
      return res.status(403).json({ error: "Speaking module is not enabled for this session" })
    }

    const recordingData: Record<string, unknown> = {
      taskNumber: tn,
      subTask: normalizedSub,
      audioUrl,
      audioDuration: Number(duration),
      recordedAt: new Date(),
      submittedAt: new Date(),
      transcript: "",
      aiBand: 0,
      aiAnalysis: {
        coherence: 0,
        vocabulary: 0,
        listenability: 0,
        taskFulfillment: 0,
        feedback: "",
      },
    }

    const recordingIndex = session.speakingRecordings.findIndex((r) => {
      const m = r as { taskNumber: number; subTask?: string | null }
      if (m.taskNumber !== tn) return false
      if (tn === 5) {
        const a = m.subTask === "B" ? "B" : "A"
        const b = normalizedSub === "B" ? "B" : "A"
        return a === b
      }
      return !m.subTask
    })

    const canOverwriteSubmitted = isActionAllowed(
      session.mode || "practice",
      "speaking",
      "canOverwriteSubmittedTask"
    )
    if (
      recordingIndex !== -1 &&
      session.speakingRecordings[recordingIndex].submittedAt &&
      !canOverwriteSubmitted
    ) {
      return res.status(409).json({ error: "Task already submitted and locked in simulation mode" })
    }

    if (recordingIndex === -1) {
      session.speakingRecordings.push(recordingData as any)
    } else {
      session.speakingRecordings[recordingIndex] = {
        ...session.speakingRecordings[recordingIndex],
        ...recordingData,
      } as any
    }

    let totalExpected = 0;
    let submittedCount = 0;

    if (selectedModules.includes("writing")) {
      const totalWritingTasks = await WritingQuestion.countDocuments({ testSetNumber: Number(testSetNumber) });
      totalExpected += totalWritingTasks;
      submittedCount += session.writingResponses.filter((r) => Boolean(r.submittedAt)).length;
    }
    if (selectedModules.includes("speaking")) {
      const totalSpeakingTasks = await SpeakingQuestion.countDocuments({ testSetNumber: Number(testSetNumber) });
      totalExpected += totalSpeakingTasks;
      submittedCount += session.speakingRecordings.length;
    }

    if (totalExpected > 0 && submittedCount >= totalExpected) {
      session.status = "submitted";
      session.completedAt = new Date();
    }

    await session.save()

    if ((session as { endedEarly?: boolean }).endedEarly) {
      return res.json({
        recordingId: session._id,
        audioUrl,
        uploadedAt: recordingData.submittedAt,
        aiGradingStatus: "skipped",
      })
    }

    await gradingQueue.add(`grade-session-${session._id}-task-${tn}-${normalizedSub || "x"}`, {
      sessionId: session._id,
      testSetNumber: Number(testSetNumber),
      taskNumber: tn,
      subTask: normalizedSub,
      module: "speaking",
    })

    emitToUser(studentId.toString(), "grading:queued", {
      sessionId: session._id,
      module: "speaking",
      taskNumber: tn,
      subTask: normalizedSub,
    })

    res.json({
      recordingId: session._id,
      audioUrl,
      uploadedAt: recordingData.submittedAt,
      aiGradingStatus: "queued",
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get task (prompt, image, timings). Task 5 requires ?subTask=A|B (defaults to A).
 */
export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskNumber } = req.params
    const { testSetNumber, subTask: qSub } = req.query
    const studentId = (req as any).user.id

    const session = await TestSession.findOne({
      studentId,
      testSetNumber: Number(testSetNumber),
      status: "in_progress",
    })
    if (!session) return res.status(404).json({ error: "Session not found" })
    if (!session.instructionsAccepted) {
      return res.status(403).json({ error: "Instructions must be accepted before starting the test" })
    }
    const selectedModules = session.selectedModules || ["writing", "speaking"]
    if (!selectedModules.includes("speaking")) {
      return res.status(403).json({ error: "Speaking module is not enabled for this session" })
    }

    const tn = Number(taskNumber)
    const st: "A" | "B" | null =
      tn === 5 ? (String(qSub).toUpperCase() === "B" ? "B" : "A") : null

    const [task, totalSpeakingTasks, testSet] = await Promise.all([
      SpeakingQuestion.findOne({
        testSetNumber: Number(testSetNumber),
        taskNumber: tn,
        subTask: st,
      }),
      SpeakingQuestion.countDocuments({ testSetNumber: Number(testSetNumber) }),
      TestSet.findOne({ testSetNumber: Number(testSetNumber) }).select('instructions').lean(),
    ])

    if (!task) return res.status(404).json({ error: "Task not found" })

    const mediaPolicy = computeEffectiveMediaPolicy(session.mode || "practice", {
      allowReplay: task.allowReplay,
      allowSeek: task.allowSeek,
      playLimit: task.playLimit,
    })
    const runtimeState = (session as any).mediaRuntime?.find(
      (r: any) =>
        r.module === "speaking" &&
        Number(r.taskNumber) === tn &&
        (tn === 5 ? (r.subTask || "A") === (st || "A") : !r.subTask)
    )
    const modePolicy = {
      canRevisitTask: isActionAllowed(session.mode || "practice", "speaking", "canRevisitTask"),
      canOverwriteSubmittedTask: isActionAllowed(
        session.mode || "practice",
        "speaking",
        "canOverwriteSubmittedTask"
      ),
      canUseHints: isActionAllowed(session.mode || "practice", "speaking", "canUseHints"),
      canViewSampleResponses: isActionAllowed(
        session.mode || "practice",
        "speaking",
        "canViewSampleResponses"
      ),
    }

    const responsePayload = {
      taskId: task._id,
      prompt: task.prompt,
      // Fallback to TestSet global instructions if task-level is empty
      introInstruction: task.introInstruction || testSet?.instructions?.speakingInstructionText,
      speakingIntroVideoUrl: task.speakingIntroVideoUrl || testSet?.instructions?.speakingInstructionVideoUrl,
      task5IntroVideoUrl: task.task5IntroVideoUrl,
      imageUrl: task.imageUrl,
      imageUrlA: task.imageUrlA,
      imageUrlB: task.imageUrlB,
      imageUrlC: task.imageUrlC,
      optionALabel: task.optionALabel,
      optionBLabel: task.optionBLabel,
      optionCLabel: task.optionCLabel,
      prepTime: task.prepTime,
      speakingTime: task.speakingTime,
      mediaType: task.mediaType,
      mediaUrl: task.mediaUrl,
      instructionVideoUrl: task.instructionVideoUrl,
      subTask: task.subTask,
      totalSpeakingTasks,
      positionInSet: positionInSpeakingFlow(tn, st),
      testSet: {
        instructions: testSet?.instructions
      },
      mediaPolicy,
      modePolicy,
      serverMediaState: {
        playCount: runtimeState?.playCount || 0,
        seekCount: runtimeState?.seekCount || 0,
        blockedCount: runtimeState?.blockedCount || 0,
        lastEventAt: runtimeState?.lastEventAt || null,
      },
    }

    logger.info('[DEBUG] Speaking getTask payload: %o', {
      taskId: task._id,
      hasTestSet: !!testSet,
      globalSpeakingVideo: testSet?.instructions?.speakingInstructionVideoUrl,
      sentSpeakingVideo: responsePayload.speakingIntroVideoUrl
    });

    res.json(responsePayload)
  } catch (error) {
    next(error)
  }
}
