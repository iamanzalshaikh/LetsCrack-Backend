import { S3Client } from '@aws-sdk/client-s3';
/**
 * Uploads audio recording buffer to S3 bucket
 *
 * @param fileBuffer - The binary audio data
 * @param studentId - The ID of the student
 * @param testSetNumber - The test set number
 * @param taskNumber - The task number (1-8)
 * @returns {Promise<string>} - The public URL of the uploaded recording
 */
export declare const uploadAudio: (fileBuffer: Buffer, studentId: string, testSetNumber: number, taskNumber: number) => Promise<string>;
declare const _default: {
    uploadAudio: (fileBuffer: Buffer, studentId: string, testSetNumber: number, taskNumber: number) => Promise<string>;
    s3: S3Client;
};
export default _default;
