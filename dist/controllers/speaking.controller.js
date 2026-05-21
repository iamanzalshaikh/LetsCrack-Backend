import TestSession from "../models/TestSession.js";
import WritingQuestion from "../models/WritingQuestion.js";
import SpeakingQuestion from "../models/SpeakingQuestion.js";
import { uploadStudentSpeakingAudio } from "../utils/cloudinaryMedia.js";
import { gradingQueue } from "../queues/index.js";
import { emitToUser } from "../sockets/emitter.js";
import { isActionAllowed } from "../utils/modeRules.js";
import { computeEffectiveMediaPolicy } from "../utils/mediaPolicy.js";
function positionInSpeakingFlow(taskNumber, sub) {
    if (taskNumber < 5)
        return taskNumber;
    if (taskNumber === 5)
        return sub === "B" ? 6 : 5;
    return taskNumber + 1;
}
/**
 * Save recorded speaking to Cloudinary and store URL on the session.
 */
export const saveRecording = async (req, res, next) => {
    try {
        const studentId = req.user.id;
        const { testSetNumber, taskNumber, duration, subTask: bodySub } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "No audio file provided" });
        }
        const tn = Number(taskNumber);
        const normalizedSub = tn === 5 ? (String(bodySub).toUpperCase() === "B" ? "B" : "A") : null;
        const audioUrl = await uploadStudentSpeakingAudio(file.buffer, studentId, Number(testSetNumber), tn, normalizedSub);
        let session = await TestSession.findOne({
            studentId,
            testSetNumber: Number(testSetNumber),
            status: "in_progress",
        });
        if (!session)
            return res.status(404).json({ error: "Session not found" });
        if (!session.instructionsAccepted) {
            return res.status(403).json({ error: "Instructions must be accepted before starting the test" });
        }
        const selectedModules = session.selectedModules || ["writing", "speaking"];
        if (!selectedModules.includes("speaking")) {
            return res.status(403).json({ error: "Speaking module is not enabled for this session" });
        }
        const recordingData = {
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
        };
        const recordingIndex = session.speakingRecordings.findIndex((r) => {
            const m = r;
            if (m.taskNumber !== tn)
                return false;
            if (tn === 5) {
                const a = m.subTask === "B" ? "B" : "A";
                const b = normalizedSub === "B" ? "B" : "A";
                return a === b;
            }
            return !m.subTask;
        });
        const canOverwriteSubmitted = isActionAllowed(session.mode || "practice", "speaking", "canOverwriteSubmittedTask");
        if (recordingIndex !== -1 &&
            session.speakingRecordings[recordingIndex].submittedAt &&
            !canOverwriteSubmitted) {
            return res.status(409).json({ error: "Task already submitted and locked in simulation mode" });
        }
        if (recordingIndex === -1) {
            session.speakingRecordings.push(recordingData);
        }
        else {
            session.speakingRecordings[recordingIndex] = {
                ...session.speakingRecordings[recordingIndex],
                ...recordingData,
            };
        }
        const [totalWritingTasks, totalSpeakingTasks] = await Promise.all([
            WritingQuestion.countDocuments({ testSetNumber: Number(testSetNumber) }),
            SpeakingQuestion.countDocuments({ testSetNumber: Number(testSetNumber) }),
        ]);
        const submittedWriting = session.writingResponses.filter((r) => Boolean(r.submittedAt)).length;
        const submittedSpeaking = session.speakingRecordings.length;
        const totalExpected = totalWritingTasks + totalSpeakingTasks;
        if (totalExpected > 0 && submittedWriting + submittedSpeaking >= totalExpected) {
            session.status = "submitted";
            session.completedAt = new Date();
        }
        await session.save();
        await gradingQueue.add(`grade-session-${session._id}-task-${tn}-${normalizedSub || "x"}`, {
            sessionId: session._id,
            testSetNumber: Number(testSetNumber),
            taskNumber: tn,
            subTask: normalizedSub,
            module: "speaking",
        });
        emitToUser(studentId.toString(), "grading:queued", {
            sessionId: session._id,
            module: "speaking",
            taskNumber: tn,
            subTask: normalizedSub,
        });
        res.json({
            recordingId: session._id,
            audioUrl,
            uploadedAt: recordingData.submittedAt,
            aiGradingStatus: "queued",
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get task (prompt, image, timings). Task 5 requires ?subTask=A|B (defaults to A).
 */
export const getTask = async (req, res, next) => {
    try {
        const { taskNumber } = req.params;
        const { testSetNumber, subTask: qSub } = req.query;
        const studentId = req.user.id;
        const session = await TestSession.findOne({
            studentId,
            testSetNumber: Number(testSetNumber),
            status: "in_progress",
        });
        if (!session)
            return res.status(404).json({ error: "Session not found" });
        if (!session.instructionsAccepted) {
            return res.status(403).json({ error: "Instructions must be accepted before starting the test" });
        }
        const selectedModules = session.selectedModules || ["writing", "speaking"];
        if (!selectedModules.includes("speaking")) {
            return res.status(403).json({ error: "Speaking module is not enabled for this session" });
        }
        const tn = Number(taskNumber);
        const st = tn === 5 ? (String(qSub).toUpperCase() === "B" ? "B" : "A") : null;
        const [task, totalSpeakingTasks] = await Promise.all([
            SpeakingQuestion.findOne({
                testSetNumber: Number(testSetNumber),
                taskNumber: tn,
                subTask: st,
            }),
            SpeakingQuestion.countDocuments({ testSetNumber: Number(testSetNumber) }),
        ]);
        if (!task)
            return res.status(404).json({ error: "Task not found" });
        const mediaPolicy = computeEffectiveMediaPolicy(session.mode || "practice", {
            allowReplay: task.allowReplay,
            allowSeek: task.allowSeek,
            playLimit: task.playLimit,
        });
        const runtimeState = session.mediaRuntime?.find((r) => r.module === "speaking" &&
            Number(r.taskNumber) === tn &&
            (tn === 5 ? (r.subTask || "A") === (st || "A") : !r.subTask));
        const modePolicy = {
            canRevisitTask: isActionAllowed(session.mode || "practice", "speaking", "canRevisitTask"),
            canOverwriteSubmittedTask: isActionAllowed(session.mode || "practice", "speaking", "canOverwriteSubmittedTask"),
            canUseHints: isActionAllowed(session.mode || "practice", "speaking", "canUseHints"),
            canViewSampleResponses: isActionAllowed(session.mode || "practice", "speaking", "canViewSampleResponses"),
        };
        res.json({
            taskId: task._id,
            prompt: task.prompt,
            introInstruction: task.introInstruction,
            speakingIntroVideoUrl: task.speakingIntroVideoUrl,
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
            mediaPolicy,
            modePolicy,
            serverMediaState: {
                playCount: runtimeState?.playCount || 0,
                seekCount: runtimeState?.seekCount || 0,
                blockedCount: runtimeState?.blockedCount || 0,
                lastEventAt: runtimeState?.lastEventAt || null,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=speaking.controller.js.map