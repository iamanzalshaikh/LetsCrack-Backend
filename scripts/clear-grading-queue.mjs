/**
 * Removes all waiting/delayed grading jobs from Redis (e.g. after quota exhaustion).
 * Run from LetsCrack-Backend: node scripts/clear-grading-queue.mjs
 */
import { Queue } from 'bullmq';
import dotenv from 'dotenv';

dotenv.config();

const redis = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT || 6379),
};

const gradingQueue = new Queue('grading', { connection: redis });

const states = ['waiting', 'delayed', 'paused', 'prioritized', 'failed'];
const jobs = await gradingQueue.getJobs(states);
let removed = 0;

for (const job of jobs) {
  try {
    await job.remove();
    removed++;
  } catch {
    /* ignore */
  }
}

console.log(`Removed ${removed} pending grading job(s).`);
await gradingQueue.close();
process.exit(0);
