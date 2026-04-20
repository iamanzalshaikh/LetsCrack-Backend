import { Queue, Worker } from 'bullmq';
export declare const notificationQueue: Queue<any, any, string, any, any, string>;
export declare const notificationWorker: Worker<any, any, string>;
export declare const gradingQueue: Queue<any, any, string, any, any, string>;
export declare const gradingWorker: Worker<any, any, string>;
declare const _default: {
    gradingQueue: Queue<any, any, string, any, any, string>;
    notificationQueue: Queue<any, any, string, any, any, string>;
};
export default _default;
