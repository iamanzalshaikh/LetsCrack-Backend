import { Request, Response, NextFunction } from 'express';
import TestSession from '../models/TestSession.js';
import QuestionBank from '../models/QuestionBank.js';
import { uploadAudio } from '../utils/s3Upload.js';
import logger from '../utils/logger.js';

/**
 * Upload recording to S3 and save URL in TestSession
 */
export const saveRecording = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId, testSetNumber, taskNumber, duration } = req.body;
    const file = (req as any).file;

    if (!file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    // Upload to S3
    const audioUrl = await uploadAudio(
      file.buffer, 
      studentId, 
      Number(testSetNumber), 
      Number(taskNumber)
    );

    // Find and update session
    let session = await TestSession.findOne({
      studentId,
      testSetNumber: Number(testSetNumber),
      status: 'in_progress'
    });

    if (!session) return res.status(404).json({ error: 'Session not found' });

    const recordingData = {
      taskNumber: Number(taskNumber),
      audioUrl,
      audioDuration: Number(duration),
      recordedAt: new Date(),
      submittedAt: new Date()
    };

    session.speakingRecordings.push(recordingData);

    // Check if it's the last task (CELPIP has 8 scored tasks)
    if (Number(taskNumber) === 8) {
      // Logic for marking module as done
    }

    await session.save();

    res.json({ 
      recordingId: session._id, 
      audioUrl, 
      uploadedAt: recordingData.submittedAt 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get task details for the student
 */
export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskNumber } = req.params;
    const { testSetNumber } = req.query;

    const task = await QuestionBank.findOne({
      module: 'speaking',
      testSetNumber: Number(testSetNumber),
      taskNumber: Number(taskNumber)
    });

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json({
      taskId: task._id,
      prompt: task.prompt,
      imageUrl: task.imageUrl,
      prepTime: task.prepTime,
      speakingTime: task.speakingTime
    });
  } catch (error) {
    next(error);
  }
};
