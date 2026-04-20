import { Queue, Worker } from 'bullmq';
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
export const notificationWorker = new Worker('notifications', async (job) => {
    logger.info(`Processing notification job ${job.id}:`, job.data);
}, { connection: redis });
// --- AI Grading Queue ---
export const gradingQueue = new Queue('grading', {
    connection: redis,
    defaultJobOptions: {
        attempts: 5, // AI APIs can be flaky, allow more retries
        backoff: { type: 'exponential', delay: 2000 },
    },
});
export const gradingWorker = new Worker('grading', async (job) => {
    const { sessionId, testSetNumber, taskNumber } = job.data;
    logger.info(`Processing AI grading for Session ${sessionId}, Task ${taskNumber}`);
    try {
        // 1. Find the session and the specific recording
        const session = await TestSession.findById(sessionId);
        if (!session)
            throw new Error('Session not found');
        const recording = session.speakingRecordings.find(r => r.taskNumber === taskNumber);
        if (!recording || !recording.audioUrl)
            throw new Error('Audio URL not found for task');
        // 2. Get the task prompt
        const question = await QuestionBank.findOne({
            module: 'speaking',
            testSetNumber,
            taskNumber
        });
        if (!question)
            throw new Error('Question not found');
        // 3. Call Gemini for grading
        const result = await gradeSpeakingTask(recording.audioUrl, question.prompt || '');
        // 4. Update the session
        recording.transcript = result.transcript;
        recording.aiBand = result.aiBand;
        recording.aiAnalysis = result.analysis;
        await session.save();
        logger.info(`AI Grading successful for Session ${sessionId}, Task ${taskNumber}`);
    }
    catch (error) {
        logger.error(`Grading Job ${job.id} Error:`, error);
        throw error; // Re-throw to allow BullMQ to retry based on job options
    }
}, { connection: redis, concurrency: 2 } // Limit concurrency for Gemini free tier limits
);
// Event Listeners
notificationWorker.on('completed', (job) => logger.info(`Notification job ${job.id} completed`));
gradingWorker.on('completed', (job) => logger.info(`Grading job ${job.id} completed`));
gradingWorker.on('failed', (job, err) => logger.error(`Grading job ${job?.id} failed:`, err));
export default { gradingQueue, notificationQueue };
//# sourceMappingURL=index.js.map