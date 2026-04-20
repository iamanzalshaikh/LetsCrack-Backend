import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';
const s3 = new S3Client({
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
});
/**
 * Uploads audio recording buffer to S3 bucket
 *
 * @param fileBuffer - The binary audio data
 * @param studentId - The ID of the student
 * @param testSetNumber - The test set number
 * @param taskNumber - The task number (1-8)
 * @returns {Promise<string>} - The public URL of the uploaded recording
 */
export const uploadAudio = async (fileBuffer, studentId, testSetNumber, taskNumber) => {
    const key = `speaking/${studentId}/set-${testSetNumber}/task-${taskNumber}-${Date.now()}.webm`;
    const params = {
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType: 'audio/webm',
    };
    try {
        const command = new PutObjectCommand(params);
        await s3.send(command);
        // Construct the S3 URL
        const url = `https://${env.AWS_S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;
        logger.info(`Audio uploaded successfully to ${url}`);
        return url;
    }
    catch (error) {
        logger.error('S3 Upload Error:', error);
        throw new Error('Failed to upload audio to cloud storage');
    }
};
export default { uploadAudio, s3 };
//# sourceMappingURL=s3Upload.js.map