import { Queue, Worker } from 'bullmq';
export declare const notificationQueue: Queue<any, any, string, any, any, string>;
export declare const notificationWorker: Worker<any, any, string>;
