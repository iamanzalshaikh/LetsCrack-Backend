import { Request, Response, NextFunction } from 'express';
import TestSession from '../models/TestSession.js';
import WritingQuestion from '../models/WritingQuestion.js';
import SpeakingQuestion from '../models/SpeakingQuestion.js';
import TestSet from '../models/TestSet.js';
import { gradingQueue } from '../queues/index.js';
import { emitToUser } from '../sockets/emitter.js';
import { isActionAllowed } from '../utils/modeRules.js';
import logger from '../utils/logger.js';

async function getSortedWritingTaskNumbers(testSetNumber: number): Promise<number[]> {
  const rows = await WritingQuestion.find({ testSetNumber })
    .select('taskNumber')
    .sort({ taskNumber: 1 })
    .lean();
  return rows
    .map((r) => Number((r as { taskNumber?: unknown }).taskNumber))
    .filter((n) => Number.isFinite(n) && n >= 1);
}

function inferNextWritingTaskFromProgress(
  writingResponses: { taskNumber?: unknown; submittedAt?: Date | null }[],
  sortedTaskNums: number[],
): number {
  const submitted = new Set(
    writingResponses
      .filter((r) => Boolean(r.submittedAt))
      .map((r) => Number(r.taskNumber))
      .filter((n) => Number.isFinite(n)),
  );
  for (const n of sortedTaskNums) {
    if (!submitted.has(n)) return n;
  }
  return -1;
}

type SimGate =
  | { ok: true; allowedWritingTask?: number }
  | { ok: false; status: number; error: string; allowedWritingTask?: number; code: string };

/**
 * Enforces linear writing in simulation: only `writingCursorTask` (or inferred next) may be accessed.
 */
async function assertSimulationWritingTaskAccess(
  session: InstanceType<typeof TestSession>,
  requestedTaskNumber: number,
): Promise<SimGate> {
  const mode = (session.mode || 'practice') as 'practice' | 'simulation';
  if (mode !== 'simulation') return { ok: true };

  const sorted = await getSortedWritingTaskNumbers(session.testSetNumber);
  if (!sorted.length) {
    return { ok: false, status: 404, error: 'No writing tasks for this test set', code: 'NO_WRITING_TASKS' };
  }

  const sid = session._id;
  let cursorRaw = (session as { writingCursorTask?: number | null }).writingCursorTask;

  if (cursorRaw === -1) {
    return {
      ok: false,
      status: 403,
      error: 'Writing is already completed for this simulation session.',
      code: 'SIMULATION_WRITING_COMPLETE',
    };
  }

  if (cursorRaw == null) {
    const inferred = inferNextWritingTaskFromProgress(session.writingResponses || [], sorted);
    await TestSession.updateOne({ _id: sid }, { $set: { writingCursorTask: inferred } });
    (session as { writingCursorTask?: number | null }).writingCursorTask = inferred;
    cursorRaw = inferred;
  }

  if (cursorRaw === -1) {
    return {
      ok: false,
      status: 403,
      error: 'Writing is already completed for this simulation session.',
      code: 'SIMULATION_WRITING_COMPLETE',
    };
  }

  const cursor = cursorRaw as number;
  if (requestedTaskNumber !== cursor) {
    return {
      ok: false,
      status: 409,
      error: `Simulation mode: work on Task ${cursor} only. You cannot open or edit Task ${requestedTaskNumber} yet.`,
      allowedWritingTask: cursor,
      code: 'SIMULATION_WRITING_LOCK',
    };
  }

  return { ok: true, allowedWritingTask: cursor };
}

/**
 * Auto-save writing response every 30 seconds
 * Body: { testSetNumber, taskNumber, responseText, wordCount }
 */
export const autoSave = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user.id;
    const { testSetNumber, responseText, wordCount, selectedOption } = req.body;
    const taskNumber = Number((req.body as { taskNumber?: unknown }).taskNumber);

    let session = await TestSession.findOne({
      studentId,
      testSetNumber,
      status: 'in_progress'
    });

    if (!session) {
      // If no session exists, create one (this shouldn't happen if test started correctly)
      return res.status(404).json({ error: 'Active test session not found' });
    }
    if (!session.instructionsAccepted) {
      return res.status(403).json({ error: 'Instructions must be accepted before starting the test' });
    }
    const selectedModules = session.selectedModules || ['writing', 'speaking'];
    if (!selectedModules.includes('writing')) {
      return res.status(403).json({ error: 'Writing module is not enabled for this session' });
    }
    if (!Number.isFinite(taskNumber) || taskNumber < 1) {
      return res.status(400).json({ error: 'Invalid taskNumber' });
    }

    const simGateAuto = await assertSimulationWritingTaskAccess(session, taskNumber);
    if (!simGateAuto.ok) {
      return res.status(simGateAuto.status).json({
        error: simGateAuto.error,
        allowedWritingTask: simGateAuto.allowedWritingTask,
        code: simGateAuto.code,
      });
    }

    const responseIdx = session.writingResponses.findIndex((r) => Number(r.taskNumber) === taskNumber);
    const existing = responseIdx >= 0 ? session.writingResponses[responseIdx] : null;
    const canOverwriteSubmitted = isActionAllowed(session.mode || 'practice', 'writing', 'canOverwriteSubmittedTask');
    if (existing?.submittedAt && !canOverwriteSubmitted) {
      return res.status(409).json({ error: 'Task already submitted and locked in simulation mode' });
    }

    if (responseIdx === -1) {
      session.writingResponses.push({ 
        taskNumber, 
        responseText, 
        wordCount, 
        selectedOption,
        autoSavedAt: new Date() 
      } as any);
    } else {
      session.writingResponses[responseIdx].responseText = responseText;
      session.writingResponses[responseIdx].wordCount = wordCount;
      session.writingResponses[responseIdx].selectedOption = selectedOption;
      session.writingResponses[responseIdx].autoSavedAt = new Date();
    }

    await session.save();
    res.json({ saved: true, timestamp: new Date(), draftId: session._id });
  } catch (error) {
    next(error);
  }
};

/**
 * Restore auto-saved response
 */
export const restore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user.id;
    const { setNumber, taskNumber } = req.params;
    
    const session = await TestSession.findOne({
      studentId,
      testSetNumber: Number(setNumber),
      status: 'in_progress'
    });

    if (!session) return res.status(404).json({ error: 'No active session found' });
    if (!session.instructionsAccepted) {
      return res.status(403).json({ error: 'Instructions must be accepted before starting the test' });
    }
    const selectedModules = session.selectedModules || ['writing', 'speaking'];
    if (!selectedModules.includes('writing')) {
      return res.status(403).json({ error: 'Writing module is not enabled for this session' });
    }

    const tn = Number(taskNumber);
    if (!Number.isFinite(tn) || tn < 1) {
      return res.status(400).json({ error: 'Invalid taskNumber' });
    }

    const simGate = await assertSimulationWritingTaskAccess(session, tn);
    if (!simGate.ok) {
      return res.status(simGate.status).json({
        error: simGate.error,
        allowedWritingTask: simGate.allowedWritingTask,
        code: simGate.code,
      });
    }

    const response = session.writingResponses.find((r) => Number(r.taskNumber) === tn);
    
    if (!response) {
      return res.json({
        responseText: '',
        wordCount: 0,
        savedAt: null,
        selectedOption: null,
      });
    }

    res.json({ 
      responseText: response.responseText, 
      wordCount: response.wordCount, 
      savedAt: response.autoSavedAt,
      selectedOption: response.selectedOption
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Final submission of writing response
 */
export const submit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user.id;
    const { testSetNumber, responseText, wordCount, timeTaken, selectedOption } = req.body;
    const taskNumber = Number((req.body as { taskNumber?: unknown }).taskNumber);

    let session = await TestSession.findOne({
      studentId,
      testSetNumber,
      status: 'in_progress'
    });

    if (!session) return res.status(404).json({ error: 'Session not found' });
    if (!session.instructionsAccepted) {
      return res.status(403).json({ error: 'Instructions must be accepted before starting the test' });
    }
    const selectedModules = session.selectedModules || ['writing', 'speaking'];
    if (!selectedModules.includes('writing')) {
      return res.status(403).json({ error: 'Writing module is not enabled for this session' });
    }

    if (!Number.isFinite(taskNumber) || taskNumber < 1) {
      return res.status(400).json({ error: 'Invalid taskNumber' });
    }

    const simGate = await assertSimulationWritingTaskAccess(session, taskNumber);
    if (!simGate.ok) {
      return res.status(simGate.status).json({
        error: simGate.error,
        allowedWritingTask: simGate.allowedWritingTask,
        code: simGate.code,
      });
    }

    const responseIdx = session.writingResponses.findIndex((r) => Number(r.taskNumber) === taskNumber);
    if (responseIdx !== -1 && session.writingResponses[responseIdx].submittedAt) {
      const canOverwriteSubmitted = isActionAllowed(session.mode || 'practice', 'writing', 'canOverwriteSubmittedTask');
      if (!canOverwriteSubmitted) {
        return res.status(409).json({ error: 'Task already submitted and locked in simulation mode' });
      }
    }
    
    const submissionData = {
      taskNumber,
      responseText,
      wordCount,
      selectedOption,
      submittedAt: new Date(),
      timeTakenSeconds: timeTaken
    };

    if (responseIdx === -1) {
      session.writingResponses.push(submissionData as any);
    } else {
      session.writingResponses[responseIdx] = {
        ...session.writingResponses[responseIdx],
        ...submissionData
      } as any;
    }

    let totalExpected = 0;
    let submittedCount = 0;

    if (selectedModules.includes('writing')) {
      const totalWritingTasks = await WritingQuestion.countDocuments({ testSetNumber: Number(testSetNumber) });
      totalExpected += totalWritingTasks;
      submittedCount += session.writingResponses.filter((r) => Boolean(r.submittedAt)).length;
    }
    if (selectedModules.includes('speaking')) {
      const totalSpeakingTasks = await SpeakingQuestion.countDocuments({ testSetNumber: Number(testSetNumber) });
      totalExpected += totalSpeakingTasks;
      submittedCount += session.speakingRecordings.length;
    }

    if (totalExpected > 0 && submittedCount >= totalExpected) {
      session.status = 'submitted';
      session.completedAt = new Date();
    }

    await session.save();

    if ((session.mode || 'practice') === 'simulation') {
      const sorted = await getSortedWritingTaskNumbers(Number(testSetNumber));
      const idx = sorted.indexOf(taskNumber);
      const nextCursor = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1]! : -1;
      await TestSession.updateOne({ _id: session._id }, { $set: { writingCursorTask: nextCursor } });
    }

    let gradingJobId: string | number | null = null;
    let aiGradingStatus: 'queued' | 'skipped' = 'queued';

    if (!(session as { endedEarly?: boolean }).endedEarly) {
      const gradingJob = await gradingQueue.add(
        `grade-writing-session-${session._id}-task-${taskNumber}`,
        {
          sessionId: session._id,
          testSetNumber: Number(testSetNumber),
          taskNumber: Number(taskNumber),
          module: 'writing',
        },
      );
      gradingJobId = gradingJob.id ?? null;

      emitToUser(studentId.toString(), 'grading:queued', {
        sessionId: session._id,
        module: 'writing',
        taskNumber: Number(taskNumber),
      });
    } else {
      aiGradingStatus = 'skipped';
    }

    /** Never block HTTP on Gemini / worker — grading continues in BullMQ (see queues/index.ts). */
    res.json({
      submissionId: String(session._id),
      status: 'submitted',
      aiGradingStatus,
      gradingJobId,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Writing Task prompt
 */
export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { setNumber, taskNumber } = req.params;
    const studentId = (req as any).user.id;

    const session = await TestSession.findOne({
      studentId,
      testSetNumber: Number(setNumber),
      status: 'in_progress',
    });
    if (!session) return res.status(404).json({ error: 'Session not found' });
    if (!session.instructionsAccepted) {
      return res.status(403).json({ error: 'Instructions must be accepted before starting the test' });
    }
    const selectedModules = session.selectedModules || ['writing', 'speaking'];
    if (!selectedModules.includes('writing')) {
      return res.status(403).json({ error: 'Writing module is not enabled for this session' });
    }
    
    const [task, testSet] = await Promise.all([
      WritingQuestion.findOne({ 
        testSetNumber: Number(setNumber),
        taskNumber: Number(taskNumber)
      }),
      TestSet.findOne({ testSetNumber: Number(setNumber) }).select('instructions').lean()
    ]);

    if (!task) return res.status(404).json({ error: 'Writing task not found' });

    const simGate = await assertSimulationWritingTaskAccess(session, Number(taskNumber));
    if (!simGate.ok) {
      return res.status(simGate.status).json({
        error: simGate.error,
        allowedWritingTask: simGate.allowedWritingTask,
        code: simGate.code,
      });
    }

    const mode = session.mode || 'practice';
    const canViewSampleResponses = isActionAllowed(mode, 'writing', 'canViewSampleResponses');
    const modePolicy = {
      canRevisitTask: isActionAllowed(mode, 'writing', 'canRevisitTask'),
      canOverwriteSubmittedTask: isActionAllowed(mode, 'writing', 'canOverwriteSubmittedTask'),
      canUseHints: isActionAllowed(mode, 'writing', 'canUseHints'),
      canViewSampleResponses,
    };

    const taskPayload: any = task.toObject();
    if (!canViewSampleResponses) {
      delete taskPayload.sampleResponse;
    }

    const eventsRaw = (session as { simulationIntegrityEvents?: unknown[] }).simulationIntegrityEvents;
    const simulationIntegrityTail = Array.isArray(eventsRaw)
      ? eventsRaw.slice(-15).map((e: any) => ({
          kind: String(e?.kind ?? ''),
          at: e?.at instanceof Date ? e.at.toISOString() : e?.at ? new Date(e.at).toISOString() : null,
          durationMs: typeof e?.durationMs === 'number' ? e.durationMs : undefined,
          focused: typeof e?.focused === 'boolean' ? e.focused : undefined,
        }))
      : [];

    const responsePayload = {
      task: taskPayload,
      testSet,
      modePolicy,
      sessionMode: mode,
      allowedWritingTask: simGate.ok ? simGate.allowedWritingTask : undefined,
      simulationFocusLossCount: session.simulationFocusLossCount ?? 0,
      simulationIntegrityTail,
    };

    logger.info('[DEBUG] Writing getTask payload: %o', {
      testSetId: testSet?._id,
      hasInstructions: !!testSet?.instructions,
      writingVideo: testSet?.instructions?.writingInstructionVideoUrl,
      taskVideo: taskPayload?.instructionVideoUrl
    });

    res.json(responsePayload);
  } catch (error) {
    next(error);
  }
};

const INTEGRITY_KINDS = new Set([
  'visibility_hidden',
  'visibility_visible',
  'window_blur',
  'window_focus',
  'fullscreen_enter',
  'fullscreen_exit',
  'fullscreen_skipped',
  'paste_blocked',
]);

const INTEGRITY_KINDS_INCREMENT_TAB_COUNT = new Set(['visibility_hidden', 'fullscreen_exit']);

type IntegrityEventInput = {
  kind?: string;
  at?: string;
  durationMs?: number;
  focused?: boolean;
};

/**
 * Append simulation integrity timeline events (and bump tab-switch count for selected kinds).
 */
export const recordSimulationIntegrity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user.id;
    const { testSetNumber, events } = req.body as {
      testSetNumber?: number;
      events?: IntegrityEventInput[];
    };

    if (!Number.isFinite(Number(testSetNumber))) {
      return res.status(400).json({ error: 'testSetNumber is required' });
    }
    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: 'events array is required' });
    }
    if (events.length > 25) {
      return res.status(400).json({ error: 'Too many events per request' });
    }

    const session = await TestSession.findOne({
      studentId,
      testSetNumber: Number(testSetNumber),
      status: 'in_progress',
    });
    if (!session) return res.status(404).json({ error: 'Active test session not found' });
    if ((session.mode || 'practice') !== 'simulation') {
      return res.json({ recorded: false, reason: 'not_simulation' });
    }

    const docs: { kind: string; at: Date; durationMs?: number; focused?: boolean }[] = [];
    let inc = 0;

    for (const e of events) {
      const kind = String(e.kind || '');
      if (!INTEGRITY_KINDS.has(kind)) continue;
      const at =
        typeof e.at === 'string' && !Number.isNaN(Date.parse(e.at)) ? new Date(e.at) : new Date();
      const row: { kind: string; at: Date; durationMs?: number; focused?: boolean } = { kind, at };
      if (
        typeof e.durationMs === 'number' &&
        Number.isFinite(e.durationMs) &&
        e.durationMs >= 0 &&
        e.durationMs < 24 * 60 * 60 * 1000
      ) {
        row.durationMs = Math.floor(e.durationMs);
      }
      if (typeof e.focused === 'boolean') {
        row.focused = e.focused;
      }
      docs.push(row);
      if (INTEGRITY_KINDS_INCREMENT_TAB_COUNT.has(kind)) inc += 1;
    }

    if (!docs.length) {
      return res.status(400).json({ error: 'No valid integrity events' });
    }

    await TestSession.updateOne(
      { _id: session._id },
      {
        ...(inc > 0 ? { $inc: { simulationFocusLossCount: inc } } : {}),
        $push: {
          simulationIntegrityEvents: {
            $each: docs,
            $slice: -200,
          },
        },
      },
    );

    const updated = await TestSession.findById(session._id).select('simulationFocusLossCount simulationIntegrityEvents');
    const count = updated?.simulationFocusLossCount ?? 0;
    const tailRaw = updated?.simulationIntegrityEvents || [];
    const simulationIntegrityTail = tailRaw.slice(-15).map((e: any) => ({
      kind: String(e?.kind ?? ''),
      at: e?.at instanceof Date ? e.at.toISOString() : null,
      durationMs: typeof e?.durationMs === 'number' ? e.durationMs : undefined,
      focused: typeof e?.focused === 'boolean' ? e.focused : undefined,
    }));

    res.json({
      recorded: true,
      simulationFocusLossCount: count,
      simulationIntegrityTail,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Legacy: same as one `visibility_hidden` integrity event (keeps old clients working).
 */
export const recordSimulationFocusLoss = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user.id;
    const { testSetNumber } = req.body as { testSetNumber?: number };

    if (!Number.isFinite(Number(testSetNumber))) {
      return res.status(400).json({ error: 'testSetNumber is required' });
    }

    const session = await TestSession.findOne({
      studentId,
      testSetNumber: Number(testSetNumber),
      status: 'in_progress',
    });
    if (!session) return res.status(404).json({ error: 'Active test session not found' });
    if ((session.mode || 'practice') !== 'simulation') {
      return res.json({ recorded: false, reason: 'not_simulation' });
    }

    const at = new Date();
    await TestSession.updateOne(
      { _id: session._id },
      {
        $inc: { simulationFocusLossCount: 1 },
        $push: {
          simulationIntegrityEvents: {
            $each: [{ kind: 'visibility_hidden', at }],
            $slice: -200,
          },
        },
      },
    );

    res.json({ recorded: true, simulationFocusLossCount: (session.simulationFocusLossCount || 0) + 1 });
  } catch (error) {
    next(error);
  }
};
