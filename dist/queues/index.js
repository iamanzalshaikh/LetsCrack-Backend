import { Queue, Worker } from 'bullmq';
import { redis } from '../config/redis.js';
import logger from '../utils/logger.js';
export const notificationQueue = new Queue('notifications', {
    connection: redis,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
    },
});
export const notificationWorker = new Worker('notifications', async (job) => {
    logger.info(`Processing notification job ${job.id}:`, job.data);
    // Add logic to send notifications (email, push, etc.)
}, { connection: redis });
notificationWorker.on('completed', (job) => {
    logger.info(`Notification job ${job.id} completed`);
});
notificationWorker.on('failed', (job, err) => {
    logger.error(`Notification job ${job?.id} failed:`, err);
});
//# sourceMappingURL=index.js.map