import { Queue, Worker, Job } from 'bullmq';
import { redis } from '../config/redis.js';
import logger from '../utils/logger.js';
import TestSession from '../models/TestSession.js';
import QuestionBank from '../models/QuestionBank.js';
import { gradeSpeakingTask } from '../utils/gemini.service.js';

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
    attempts: 5, // AI APIs can be flaky, allow more retries
    backoff: { type: 'exponential', delay: 2000 },
  },
});

export const gradingWorker = new Worker(
  'grading',
  async (job: Job) => {
    const { sessionId, testSetNumber, taskNumber, module = 'speaking' } = job.data;
    logger.info(`Processing AI grading for Session ${sessionId}, ${module} Task ${taskNumber}`);

    try {
      // 1. Find the session
      const session = await TestSession.findById(sessionId);
      if (!session) throw new Error('Session not found');

      // 2. Get the task prompt
      const question = await QuestionBank.findOne({
        module,
        testSetNumber,
        taskNumber
      });
      if (!question) throw new Error('Question not found');

      if (module === 'speaking') {
        const recording = session.speakingRecordings.find(r => r.taskNumber === taskNumber);
        if (!recording || !recording.audioUrl) throw new Error('Audio URL not found for task');

        const result = await gradeSpeakingTask(recording.audioUrl, question.prompt || '');
        
        recording.transcript = result.transcript;
        recording.aiBand = result.aiBand;
        recording.aiAnalysis = result.analysis;
      } else if (module === 'writing') {
        const response = session.writingResponses.find(r => r.taskNumber === taskNumber);
        if (!response || !response.responseText) throw new Error('Response text not found for writing task');

        const result = await gradeWritingTask(response.responseText, question.scenario?.backgroundParagraph || question.prompt || '');
        
        response.aiBand = result.aiBand;
        response.aiAnalysis = result.analysis;
      }

      await session.save();
      logger.info(`AI Grading successful for Session ${sessionId}, ${module} Task ${taskNumber}`);
    } catch (error) {
      logger.error(`Grading Job ${job.id} Error:`, error);
      throw error; 
    }
  },
  { connection: redis, concurrency: 2 } 
);

// Event Listeners
notificationWorker.on('completed', (job) => logger.info(`Notification job ${job.id} completed`));
gradingWorker.on('completed', (job) => logger.info(`Grading job ${job.id} completed`));
gradingWorker.on('failed', (job, err) => logger.error(`Grading job ${job?.id} failed:`, err));

export default { gradingQueue, notificationQueue };
