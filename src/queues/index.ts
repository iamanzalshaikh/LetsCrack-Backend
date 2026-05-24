import { Queue, Worker, Job, QueueEvents, UnrecoverableError } from 'bullmq';
import { redis } from '../config/redis.js';
import logger from '../utils/logger.js';
import TestSession from '../models/TestSession.js';
import QuestionBank from '../models/QuestionBank.js';
import WritingQuestion from '../models/WritingQuestion.js';
import SpeakingQuestion from '../models/SpeakingQuestion.js';
import TestResult from '../models/TestResult.js';
import {
  gradeSpeakingTask,
  gradeWritingTask,
  buildBlendedCelpipWritingFeedback,
} from '../utils/gemini.service.js';
import { emitToUser } from '../sockets/emitter.js';

const clampBand = (value: unknown): number => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(1, Math.min(12, Math.round(numeric)));
};

const averageBand = (scores: unknown[]): number => {
  const valid = scores.map((s) => Number(s)).filter((s) => Number.isFinite(s) && s > 0);
  if (valid.length === 0) return 0;
  return clampBand(valid.reduce((sum, s) => sum + s, 0) / valid.length);
};

const clampIeltsBand = (value: unknown): number => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  const stepped = Math.round(numeric * 2) / 2;
  return Math.max(0, Math.min(9, stepped));
};

/** CELPIP Writing: each task scored out of 6 (whole numbers). */
const clampCelpipWriting6 = (value: unknown): number => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(1, Math.min(6, Math.round(numeric)));
};

/** Full task context for CELPIP evaluation (not just background paragraph). */
const buildWritingEvaluationPrompt = (
  question: {
  scenario?: {
    subheading?: string | null;
    backgroundParagraph?: string | null;
    taskInstructions?: string[] | null;
  } | null;
  surveyTopic?: string | null;
  questions?: Array<{ questionText?: string | null }> | null;
  optionA?: string | null;
  optionB?: string | null;
  wordCountTarget?: string | null;
  },
  taskNumber: number,
) => {
  const taskTitle =
    taskNumber === 1
      ? 'CELPIP Writing Task 1 — Writing an Email'
      : 'CELPIP Writing Task 2 — Responding to Survey Questions';
  const parts: string[] = [`Task type: ${taskTitle} (taskNumber=${taskNumber})`];
  if (question.scenario?.subheading) parts.push(`Subheading:\n${question.scenario.subheading}`);
  if (question.scenario?.backgroundParagraph) parts.push(`Background:\n${question.scenario.backgroundParagraph}`);
  const taskInstr = question.scenario?.taskInstructions;
  if (Array.isArray(taskInstr) && taskInstr.length) {
    parts.push(`Instructions:\n${taskInstr.map((s) => `- ${s}`).join('\n')}`);
  }
  if (question.surveyTopic) parts.push(`Survey topic:\n${question.surveyTopic}`);
  if (question.questions?.length && question.questions[0]?.questionText) {
    parts.push(`Question:\n${question.questions[0].questionText}`);
  }
  if (question.optionA || question.optionB) {
    parts.push(
      `Options:\nA) ${question.optionA ?? ''}\nB) ${question.optionB ?? ''}`,
    );
  }
  if (question.wordCountTarget) parts.push(`Word count target: ${question.wordCountTarget}`);
  return parts.join('\n\n').trim() || 'Writing task (prompt not fully configured in CMS).';
};

const bandToNumeric = (band?: string | null): number | null => {
  if (!band) return null;
  if (band === 'M') return 0;
  if (band.includes('-')) {
    const [start, end] = band.split('-').map(Number);
    if (Number.isFinite(start) && Number.isFinite(end)) return (start + end) / 2;
  }
  const asNum = Number(band);
  return Number.isFinite(asNum) ? asNum : null;
};

/** Persist aggregate bands → TestResult + push socket progress — call after DB writes touching aiBand rows. */
const emitGradingProgressAfterSessionUpdate = async (
  sessionId: string,
  testSetNumber: number,
  module: string,
  taskNumber: number,
) => {
  let session = await TestSession.findById(sessionId);
  if (!session) throw new Error('Session not found after grading update');
  await writeSessionBandsToResult(session, testSetNumber);
  session = await TestSession.findById(sessionId);
  if (!session) throw new Error('Session not found after grading update');
  const [totalWritingTasks, totalSpeakingTasks, readingTask, listeningTask] = await Promise.all([
    WritingQuestion.countDocuments({ testSetNumber }),
    SpeakingQuestion.countDocuments({ testSetNumber }),
    QuestionBank.findOne({ module: 'reading', testSetNumber }).select('mcqs'),
    QuestionBank.findOne({ module: 'listening', testSetNumber }).select('mcqs'),
  ]);
  const gradedWriting = session.writingResponses.filter((r) => (r.aiBand || 0) > 0).length;
  const gradedSpeaking = session.speakingRecordings.filter((r) => (r.aiBand || 0) > 0).length;
  const selectedModules = session.selectedModules || ['writing', 'speaking'];
  const readingCount = readingTask?.mcqs?.length || 0;
  const listeningCount = listeningTask?.mcqs?.length || 0;
  const readingSubmitted = session.mcqResponses.filter((r: any) => r.module === 'reading').length;
  const listeningSubmitted = session.mcqResponses.filter((r: any) => r.module === 'listening').length;
  const gradedReading = readingSubmitted > 0 ? readingCount : 0;
  const gradedListening = listeningSubmitted > 0 ? listeningCount : 0;

  const expectedWriting = selectedModules.includes('writing') ? totalWritingTasks : 0;
  const expectedSpeaking = selectedModules.includes('speaking') ? totalSpeakingTasks : 0;
  const expectedReading = selectedModules.includes('reading') ? readingCount : 0;
  const expectedListening = selectedModules.includes('listening') ? listeningCount : 0;
  const totalGraded = gradedWriting + gradedSpeaking + gradedReading + gradedListening;
  const totalExpected = expectedWriting + expectedSpeaking + expectedReading + expectedListening;

  if (totalExpected > 0 && totalGraded >= totalExpected) {
    await TestSession.updateOne(
      { _id: sessionId },
      { $set: { status: 'graded' } },
    );
  }

  emitToUser(session.studentId.toString(), 'grading:updated', {
    sessionId: session._id,
    module,
    taskNumber,
    status: totalExpected > 0 && totalGraded >= totalExpected ? 'graded' : 'grading',
    progress: {
      writing: { graded: gradedWriting, total: expectedWriting },
      speaking: { graded: gradedSpeaking, total: expectedSpeaking },
      reading: { graded: gradedReading, total: expectedReading },
      listening: { graded: gradedListening, total: expectedListening },
      overall: { graded: totalGraded, total: totalExpected },
    },
  });
};

const writeSessionBandsToResult = async (session: any, testSetNumber: number) => {
  let result = await TestResult.findOne({ testSessionId: session._id });
  if (!result) {
    result = new TestResult({
      studentId: session.studentId,
      testSessionId: session._id,
      testSetNumber,
    });
  }

  const writingResponses = (session.writingResponses || []).filter((r: any) => (r.aiBand || 0) > 0);
  if (writingResponses.length > 0) {
    const task1 = writingResponses.find((r: any) => r.taskNumber === 1);
    const task2 = writingResponses.find((r: any) => r.taskNumber === 2);
    const writingBandNumeric = averageBand(writingResponses.map((r: any) => r.aiBand));
    result.writingBand = {
      task1Scores: task1
        ? {
            content: task1.aiAnalysis?.coherence || 0,
            vocab: task1.aiAnalysis?.vocabulary || 0,
            readability: task1.aiAnalysis?.readability || 0,
            taskFulfillment: task1.aiAnalysis?.taskFulfillment || 0,
          }
        : undefined,
      task2Scores: task2
        ? {
            content: task2.aiAnalysis?.coherence || 0,
            vocab: task2.aiAnalysis?.vocabulary || 0,
            readability: task2.aiAnalysis?.readability || 0,
            taskFulfillment: task2.aiAnalysis?.taskFulfillment || 0,
          }
        : undefined,
      finalBand: writingBandNumeric ? String(writingBandNumeric) : undefined,
    } as any;
  }

  const speakingRecordings = (session.speakingRecordings || []).filter((r: any) => (r.aiBand || 0) > 0);
  if (speakingRecordings.length > 0) {
    const speakingBandNumeric = averageBand(speakingRecordings.map((r: any) => r.aiBand));
    result.speakingBand = {
      taskScores: speakingRecordings.map((r: any) => ({
        taskNumber: r.taskNumber,
        subTask: r.subTask ?? null,
        coherence: r.aiAnalysis?.coherence || 0,
        vocabulary: r.aiAnalysis?.vocabulary || 0,
        listenability: r.aiAnalysis?.listenability || 0,
        taskFulfillment: r.aiAnalysis?.taskFulfillment || 0,
        examinerFeedback: r.aiAnalysis?.feedback || '',
        modelAnswer: r.aiAnalysis?.modelAnswer || '',
      })),
      finalBand: speakingBandNumeric ? String(speakingBandNumeric) : undefined,
    } as any;
  }

  const candidateBands = [
    result.writingBand?.finalBand,
    result.speakingBand?.finalBand,
    result.readingBand?.finalBand,
    result.listeningBand?.finalBand,
  ]
    .map(bandToNumeric)
    .filter((v): v is number => v !== null);
  if (candidateBands.length) {
    result.overallBand = (candidateBands.reduce((sum, v) => sum + v, 0) / candidateBands.length).toFixed(1);
  }
  result.scoredAt = new Date();
  await result.save();
  return result;
};

// --- Notifications Queue ---

export const notificationQueue = new Queue('notifications', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
  },
});

export const notificationWorker = new Worker(
  'notifications',
  async (job: Job) => {
    logger.info(`Processing notification job ${job.id}:`, job.data);
  },
  { connection: redis },
);

// --- AI Grading Queue ---

export const gradingQueue = new Queue('grading', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 10000 },
    removeOnComplete: true,
    removeOnFail: 50,
  },
});
export const gradingQueueEvents = new QueueEvents('grading', { connection: redis });

/** Remove pending grading jobs so leaving a test does not keep burning Gemini quota. */
export const cancelGradingJobsForSession = async (sessionId: string): Promise<number> => {
  const jobs = await gradingQueue.getJobs(['waiting', 'delayed', 'paused', 'prioritized', 'failed']);
  let removed = 0;
  for (const job of jobs) {
    if (job.data?.sessionId === sessionId) {
      try {
        await job.remove();
        removed++;
      } catch (err) {
        logger.warn(`Could not remove grading job ${job.id}:`, err);
      }
    }
  }
  if (removed > 0) {
    logger.info(`Cancelled ${removed} pending grading job(s) for session ${sessionId}`);
  }
  return removed;
};

export const gradingWorker = new Worker(
  'grading',
  async (job: Job) => {
    const { sessionId, testSetNumber, taskNumber, subTask, module = 'speaking' } = job.data as {
      sessionId: string;
      testSetNumber: number;
      taskNumber: number;
      subTask?: 'A' | 'B' | null;
      module?: string;
    };
    logger.info(`Processing AI grading for Session ${sessionId}, ${module} Task ${taskNumber} ${subTask || ''}`);

    try {
      // 1. Find the session
      let session = await TestSession.findById(sessionId);
      if (!session) throw new Error('Session not found');

      if ((session as { endedEarly?: boolean }).endedEarly) {
        logger.info(`Skipping grading job ${job.id}: session ${sessionId} was ended early by student`);
        return;
      }

      // 2. Get the task prompt
      if (module === 'speaking') {
        const tn = Number(taskNumber);
        const st: 'A' | 'B' | null = tn === 5 ? (subTask === 'B' ? 'B' : 'A') : null;
        const question = await SpeakingQuestion.findOne({ testSetNumber, taskNumber: tn, subTask: st });
        if (!question) throw new Error('Question not found');
        const recording = session.speakingRecordings.find((r) => {
          const m = r as { taskNumber: number; subTask?: string | null };
          if (m.taskNumber !== tn) return false;
          if (tn === 5) {
            const a = m.subTask === 'B' ? 'B' : 'A';
            const b = st === 'B' ? 'B' : 'A';
            return a === b;
          }
          return !m.subTask;
        });
        if (!recording || !recording.audioUrl) throw new Error('Audio URL not found for task');

        const result = await gradeSpeakingTask(recording.audioUrl, question.prompt || '');

        console.log(`\n=========================================\n[SPEAKING TRANSCRIPT] Task ${tn} (Session ${sessionId}):\n"${result.transcript}"\n=========================================\n`);

        const normalizedAnalysis = {
          coherence: clampBand(result?.analysis?.coherence),
          vocabulary: clampBand(result?.analysis?.vocabulary),
          listenability: clampBand(result?.analysis?.listenability),
          taskFulfillment: clampBand(result?.analysis?.taskFulfillment),
          feedback: String(result?.analysis?.feedback || ''),
          modelAnswer: String(result?.analysis?.modelAnswer || ''),
        };
        const normalizedBand =
          clampBand(result?.aiBand) ||
          averageBand([
            normalizedAnalysis.coherence,
            normalizedAnalysis.vocabulary,
            normalizedAnalysis.listenability,
            normalizedAnalysis.taskFulfillment,
          ]);

        const speakingQuery: Record<string, unknown> = {
          _id: sessionId,
          'speakingRecordings.taskNumber': tn,
        };
        if (tn === 5) {
          speakingQuery['speakingRecordings.subTask'] = st;
        }
        const speakingUpdateRes = await TestSession.updateOne(
          speakingQuery,
          {
            $set: {
              'speakingRecordings.$.transcript': result.transcript,
              'speakingRecordings.$.aiBand': normalizedBand,
              'speakingRecordings.$.aiAnalysis': normalizedAnalysis,
            },
          },
        );
        if (!speakingUpdateRes.matchedCount) {
          throw new Error('Speaking recording row not found for atomic grading update');
        }
      } else if (module === 'writing') {
        const tn = Number(taskNumber);
        const question = await WritingQuestion.findOne({ testSetNumber, taskNumber });
        if (!question) throw new Error('Question not found');
        const response = session.writingResponses.find(r => r.taskNumber === taskNumber);
        if (!response || !response.responseText) throw new Error('Response text not found for writing task');

        const taskPromptForAi = buildWritingEvaluationPrompt(question, tn);
        
        // Unified call handles scores, detailed narrative, model answer, etc. in one pass
        const result = await gradeWritingTask(response.responseText, taskPromptForAi, tn);

        const writingUpdateRes = await TestSession.updateOne(
          { _id: sessionId, 'writingResponses.taskNumber': taskNumber },
          {
            $set: {
              'writingResponses.$.aiBand': result.overallBand,
              'writingResponses.$.aiAnalysis': {
                coherence: result.coherenceMeaning,
                vocabulary: result.vocabulary,
                readability: result.readability,
                taskFulfillment: result.taskFulfillment,
                feedback: result.analysis.feedback,
                strengths: result.strengths,
                improvements: result.improvements,
                quickTips: result.quickTips,
                lineFeedback: result.lineFeedback,
                modelAnswer: result.modelAnswer,
                overallRemark: result.overallRemark,
                detailedFeedback: result.detailedFeedback,
                categoryBullets: result.categoryBullets,
              },
            },
          },
        );
        if (!writingUpdateRes.matchedCount) {
          throw new Error('Writing response row not found for atomic grading update');
        }
      }

      await emitGradingProgressAfterSessionUpdate(sessionId, testSetNumber, module, Number(taskNumber));

      logger.info(`AI Grading successful for Session ${sessionId}, ${module} Task ${taskNumber}`);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      if (errMsg.includes('DAILY_QUOTA_EXHAUSTED')) {
        logger.error(`Grading Job ${job.id}: daily quota exhausted — not retrying`);
        throw new UnrecoverableError(errMsg);
      }
      logger.error(`Grading Job ${job.id} Error:`, error);
      if (job.data?.sessionId) {
        const session = await TestSession.findById(job.data.sessionId).select('studentId');
        if (session?.studentId) {
          emitToUser(session.studentId.toString(), 'grading:failed', {
            sessionId: job.data.sessionId,
            module: job.data.module || 'speaking',
            taskNumber: job.data.taskNumber,
            message: 'AI grading failed for this task.',
          });
        }
      }
      throw error; 
    }
  },
  { connection: redis, concurrency: 1 } 
);

// Event Listeners
notificationWorker.on('completed', (job) => logger.info(`Notification job ${job.id} completed`));
gradingWorker.on('completed', (job) => logger.info(`Grading job ${job.id} completed`));
gradingWorker.on('failed', (job, err) => logger.error(`Grading job ${job?.id} failed:`, err));

export default { gradingQueue, notificationQueue };
