import { Request, Response, NextFunction } from 'express';
import TestSession from '../models/TestSession.js';
import TestResult from '../models/TestResult.js';
import { calculateAverage, calculateBand } from '../utils/bandCalculator.js';
import logger from '../utils/logger.js';

/**
 * Get pending submissions list
 */
export const getPendingSubmissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status = 'submitted' } = req.query;
    
    // Find all sessions with submitted status
    const submissions = await TestSession.find({ status })
      .populate('studentId', 'firstName lastName email')
      .sort({ completedAt: -1 });

    const formattedSubmissions = submissions.map(s => ({
      submissionId: s._id,
      studentName: `${(s.studentId as any).firstName} ${(s.studentId as any).lastName}`,
      testSet: s.testSetNumber,
      submittedAt: s.completedAt || s.startedAt,
      module: s.writingResponses.length > 0 ? 'Writing' : 'Speaking'
    }));

    res.json({ submissions: formattedSubmissions });
  } catch (error) {
    next(error);
  }
};

/**
 * Get specific submission details for scoring
 */
export const getSubmissionDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { submissionId } = req.params;
    
    const session = await TestSession.findById(submissionId)
      .populate('studentId', 'firstName lastName');

    if (!session) return res.status(404).json({ error: 'Submission not found' });

    res.json({
      submissionId: session._id,
      studentName: `${(session.studentId as any).firstName} ${(session.studentId as any).lastName}`,
      writing: session.writingResponses,
      speaking: session.speakingRecordings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Submit examiner scores and feedback
 */
export const submitScore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { submissionId, scores, feedback } = req.body;
    const examinerId = (req as any).user.id;

    // Validate scores (1-12)
    const validScores = Object.values(scores as Record<string, number>).every(s => s >= 1 && s <= 12);
    if (!validScores) {
      return res.status(400).json({ error: 'All scores must be between 1 and 12' });
    }

    // Calculate band
    const avg = calculateAverage(scores);
    const band = calculateBand(avg);

    // Save to TestResult
    const session = await TestSession.findById(submissionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    let result = await TestResult.findOne({ testSessionId: submissionId });
    
    const scoreData = {
      ...scores,
      finalBand: band
    };

    if (!result) {
      result = new TestResult({
        studentId: session.studentId,
        testSessionId: submissionId,
        testSetNumber: session.testSetNumber,
        writingBand: session.writingResponses.length > 0 ? scoreData : undefined,
        speakingBand: session.speakingRecordings.length > 0 ? { taskScores: [{ ...scores, examinerFeedback: feedback }], finalBand: band } : undefined,
        examinerAssigned: examinerId,
        scoredAt: new Date()
      });
    } else {
      // Logic for updating existing result if multiple modules scored separately
      if (session.writingResponses.length > 0) result.writingBand = scoreData;
      result.examinerAssigned = examinerId;
      result.scoredAt = new Date();
    }

    await result.save();

    // Mark session as graded
    session.status = 'graded';
    await session.save();

    res.json({ scoreId: result._id, locked: true, band });
  } catch (error) {
    next(error);
  }
};
