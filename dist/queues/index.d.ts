import { Queue, Worker, QueueEvents } from 'bullmq';
export declare const notificationQueue: Queue<any, any, string, any, any, string>;
export declare const notificationWorker: Worker<any, any, string>;
export declare const gradingQueue: Queue<any, any, string, any, any, string>;
export declare const gradingQueueEvents: QueueEvents;
/** Remove pending grading jobs so leaving a test does not keep burning Gemini quota. */
export declare const cancelGradingJobsForSession: (sessionId: string) => Promise<number>;
export declare const gradingWorker: Worker<any, any, string>;
declare const _default: {
    gradingQueue: Queue<any, any, string, any, any, string>;
    notificationQueue: Queue<any, any, string, any, any, string>;
};
export default _default;
