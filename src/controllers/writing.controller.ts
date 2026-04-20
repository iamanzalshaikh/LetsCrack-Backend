import { Request, Response, NextFunction } from 'express';
import TestSession from '../models/TestSession.js';
import { gradingQueue } from '../queues/index.js';
import logger from '../utils/logger.js';

/**
 * Auto-save writing response every 30 seconds
 * Body: { studentId, testSetNumber, taskNumber, responseText, wordCount }
 */
export const autoSave = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId, testSetNumber, taskNumber, responseText, wordCount } = req.body;
    
    let session = await TestSession.findOne({
      studentId,
      testSetNumber,
      status: 'in_progress'
    });

    if (!session) {
      // If no session exists, create one (this shouldn't happen if test started correctly)
      return res.status(404).json({ error: 'Active test session not found' });
    }

    const responseIdx = session.writingResponses.findIndex(r => r.taskNumber === taskNumber);

    if (responseIdx === -1) {
      session.writingResponses.push({ 
        taskNumber, 
        responseText, 
        wordCount, 
        autoSavedAt: new Date() 
      } as any);
    } else {
      session.writingResponses[responseIdx].responseText = responseText;
      session.writingResponses[responseIdx].wordCount = wordCount;
      session.writingResponses[responseIdx].autoSavedAt = new Date();
    }

    await session.save();
    res.json({ saved: true, timestamp: new Date(), draftId: session._id });
  } catch (error) {
    next(error);
  }
};

/**
 * Restore auto-saved response
 */
export const restore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId, setNumber, taskNumber } = req.params;
    
    const session = await TestSession.findOne({
      studentId,
      testSetNumber: Number(setNumber),
      status: 'in_progress'
    });

    if (!session) return res.status(404).json({ error: 'No active session found' });

    const response = session.writingResponses.find(r => r.taskNumber === Number(taskNumber));
    
    if (!response) return res.status(404).json({ error: 'No draft found' });

    res.json({ 
      responseText: response.responseText, 
      wordCount: response.wordCount, 
      savedAt: response.autoSavedAt,
      selectedOption: response.selectedOption
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Final submission of writing response
 */
export const submit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId, testSetNumber, taskNumber, responseText, wordCount, timeTaken, selectedOption } = req.body;
    
    let session = await TestSession.findOne({
      studentId,
      testSetNumber,
      status: 'in_progress'
    });

    if (!session) return res.status(404).json({ error: 'Session not found' });

    const responseIdx = session.writingResponses.findIndex(r => r.taskNumber === taskNumber);
    
    const submissionData = {
      taskNumber,
      responseText,
      wordCount,
      selectedOption,
      submittedAt: new Date(),
      timeTakenSeconds: timeTaken
    };

    if (responseIdx === -1) {
      session.writingResponses.push(submissionData as any);
    } else {
      session.writingResponses[responseIdx] = {
        ...session.writingResponses[responseIdx],
        ...submissionData
      } as any;
    }

    // Check if all writing tasks are done (Task 1 and 2)
    const isDone = session.writingResponses.length >= 2;
    if (isDone) {
      // Logic for moving to next module or ending the test
    }

    await session.save();

    // Trigger AI Grading in background
    await gradingQueue.add(`grade-writing-session-${session._id}-task-${taskNumber}`, {
      sessionId: session._id,
      testSetNumber: Number(testSetNumber),
      taskNumber: Number(taskNumber),
      module: 'writing'
    });

    res.json({ 
      submissionId: session._id, 
      status: 'submitted',
      aiGradingStatus: 'queued'
    });
  } catch (error) {
    next(error);
  }
};
