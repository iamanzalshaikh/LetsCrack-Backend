import TestSession from '../models/TestSession.js';
import QuestionBank from '../models/QuestionBank.js';
import { uploadAudio } from '../utils/s3Upload.js';
import { gradingQueue } from '../queues/index.js';
/**
 * Upload recording to S3 and save URL in TestSession
 */
export const saveRecording = async (req, res, next) => {
    try {
        const { studentId, testSetNumber, taskNumber, duration } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No audio file provided' });
        }
        // Upload to S3
        const audioUrl = await uploadAudio(file.buffer, studentId, Number(testSetNumber), Number(taskNumber));
        // Find and update session
        let session = await TestSession.findOne({
            studentId,
            testSetNumber: Number(testSetNumber),
            status: 'in_progress'
        });
        if (!session)
            return res.status(404).json({ error: 'Session not found' });
        const recordingData = {
            taskNumber: Number(taskNumber),
            audioUrl,
            audioDuration: Number(duration),
            recordedAt: new Date(),
            submittedAt: new Date(),
            transcript: '',
            aiBand: 0,
            aiAnalysis: {
                coherence: 0,
                vocabulary: 0,
                listenability: 0,
                taskFulfillment: 0,
                feedback: ''
            }
        };
        session.speakingRecordings.push(recordingData);
        // Check if it's the last task (CELPIP has 8 scored tasks)
        if (Number(taskNumber) === 8) {
            session.status = 'submitted';
            session.completedAt = new Date();
        }
        await session.save();
        // Trigger AI Grading in background
        await gradingQueue.add(`grade-session-${session._id}-task-${taskNumber}`, {
            sessionId: session._id,
            testSetNumber: Number(testSetNumber),
            taskNumber: Number(taskNumber)
        });
        res.json({
            recordingId: session._id,
            audioUrl,
            uploadedAt: recordingData.submittedAt,
            aiGradingStatus: 'queued'
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get task details for the student
 */
export const getTask = async (req, res, next) => {
    try {
        const { taskNumber } = req.params;
        const { testSetNumber } = req.query;
        const task = await QuestionBank.findOne({
            module: 'speaking',
            testSetNumber: Number(testSetNumber),
            taskNumber: Number(taskNumber)
        });
        if (!task)
            return res.status(404).json({ error: 'Task not found' });
        res.json({
            taskId: task._id,
            prompt: task.prompt,
            imageUrl: task.imageUrl,
            prepTime: task.prepTime,
            speakingTime: task.speakingTime
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=speaking.controller.js.map