import { Request, Response, NextFunction } from 'express';
import TestSession from '../models/TestSession.js';
import QuestionBank from '../models/QuestionBank.js';
import TestResult from '../models/TestResult.js';
import WritingQuestion from '../models/WritingQuestion.js';
import SpeakingQuestion from '../models/SpeakingQuestion.js';
import { calculateBand } from '../utils/bandCalculator.js';
import logger from '../utils/logger.js';
import { isActionAllowed } from '../utils/modeRules.js';
import { computeEffectiveMediaPolicy } from '../utils/mediaPolicy.js';

const bandToNumeric = (band?: string | null): number | null => {
  if (!band) return null;
  if (band === 'M') return 0;
  if (band.includes('-')) {
    const [start, end] = band.split('-').map(Number);
    if (Number.isFinite(start) && Number.isFinite(end)) return (start + end) / 2;
  }
  const asNum = Number(band);
  return Number.isFinite(asNum) ? asNum : null;
};

/**
 * Submit MCQ answers (Reading/Listening) and auto-grade
 * Body: { testSetNumber, module, answers: [{ questionId, selectedOption }] }
 */
export const submitMcqAnswers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user.id;
    const { testSetNumber, module, answers } = req.body as {
      testSetNumber: number;
      module: 'reading' | 'listening';
      answers: Array<{ questionId: string; selectedOption: number }>;
    };

    if (!['reading', 'listening'].includes(module)) {
      return res.status(400).json({ error: 'Invalid module for MCQ submission' });
    }
    
    // Fetch the correct answers from the Question Bank
    const bankTask = await QuestionBank.findOne({ 
      module, 
      testSetNumber: Number(testSetNumber) 
    });

    if (!bankTask) {
      return res.status(404).json({ error: 'Question Bank entry not found for this module/set' });
    }

    let correctCount = 0;
    const totalQuestions = bankTask.mcqs.length;

    const session = await TestSession.findOne({
      studentId,
      testSetNumber: Number(testSetNumber),
      status: 'in_progress',
    });
    if (!session) return res.status(404).json({ error: 'Session not found' });
    if (!session.instructionsAccepted) {
      return res.status(403).json({ error: 'Instructions must be accepted before starting the test' });
    }
    const selectedModules = session.selectedModules || ['writing', 'speaking'];
    if (!selectedModules.includes(module)) {
      return res.status(403).json({ error: `${module} module is not enabled for this session` });
    }

    const hasSubmittedModule = session.mcqResponses.some((r: any) => r.module === module);
    const canOverwriteSubmitted = isActionAllowed(session.mode || 'practice', module, 'canOverwriteSubmittedTask');
    if (hasSubmittedModule && !canOverwriteSubmitted) {
      return res.status(409).json({ error: `${module} section already submitted and locked in simulation mode` });
    }

    // Compare student answers with correct options
    const processedResponses = bankTask.mcqs.map((q: any) => {
      const studentAnswer = answers.find((a: any) => a.questionId === q._id.toString());
      const selectedOption = studentAnswer ? studentAnswer.selectedOption : -1;
      const isCorrect = selectedOption === q.correctOption;
      
      if (isCorrect) correctCount++;

      return {
        module,
        questionId: q._id,
        selectedOption,
        isCorrect
      };
    });

    // Calculate raw score and map to band (This is a simplified 1-12 mapping for MCQs)
    const rawPercentage = (correctCount / totalQuestions) * 100;
    const clbScore = Math.round((rawPercentage / 100) * 12); // Scaling to 1-12 range
    const band = calculateBand(clbScore);

    const nextResponses = [
      ...session.mcqResponses.filter((r: any) => r.module !== module),
      ...(processedResponses as any[]),
    ];
    session.set('mcqResponses', nextResponses);
    session.mcqScore = correctCount;

    // Check if the entire test session is complete and update status
    let totalExpected = 0;
    let submittedCount = 0;

    if (selectedModules.includes('writing')) {
      const totalWritingTasks = await WritingQuestion.countDocuments({ testSetNumber: Number(testSetNumber) });
      totalExpected += totalWritingTasks;
      submittedCount += session.writingResponses.filter((r) => Boolean(r.submittedAt)).length;
    }
    if (selectedModules.includes('speaking')) {
      const totalSpeakingTasks = await SpeakingQuestion.countDocuments({ testSetNumber: Number(testSetNumber) });
      totalExpected += totalSpeakingTasks;
      submittedCount += session.speakingRecordings.length;
    }
    if (selectedModules.includes('reading')) {
      const readingTask = await QuestionBank.findOne({ module: 'reading', testSetNumber: Number(testSetNumber) });
      const readingCount = readingTask?.mcqs?.length || 0;
      totalExpected += readingCount;
      submittedCount += nextResponses.filter((r: any) => r.module === 'reading').length;
    }
    if (selectedModules.includes('listening')) {
      const listeningTask = await QuestionBank.findOne({ module: 'listening', testSetNumber: Number(testSetNumber) });
      const listeningCount = listeningTask?.mcqs?.length || 0;
      totalExpected += listeningCount;
      submittedCount += nextResponses.filter((r: any) => r.module === 'listening').length;
    }

    const gradedWriting = session.writingResponses.filter((r) => (r.aiBand || 0) > 0).length;
    const gradedSpeaking = session.speakingRecordings.filter((r) => (r.aiBand || 0) > 0).length;
    const readingTask = await QuestionBank.findOne({ module: 'reading', testSetNumber: Number(testSetNumber) });
    const readingCount = readingTask?.mcqs?.length || 0;
    const listeningTask = await QuestionBank.findOne({ module: 'listening', testSetNumber: Number(testSetNumber) });
    const listeningCount = listeningTask?.mcqs?.length || 0;
    const gradedReading = nextResponses.filter((r: any) => r.module === 'reading').length > 0 ? readingCount : 0;
    const gradedListening = nextResponses.filter((r: any) => r.module === 'listening').length > 0 ? listeningCount : 0;
    const totalGraded = gradedWriting + gradedSpeaking + gradedReading + gradedListening;

    if (totalExpected > 0 && totalGraded >= totalExpected) {
      session.status = 'graded';
      session.completedAt = new Date();
    } else if (totalExpected > 0 && submittedCount >= totalExpected) {
      session.status = 'submitted';
      session.completedAt = new Date();
    }

    await session.save();

    let result = await TestResult.findOne({ testSessionId: session._id });
    if (!result) {
      result = new TestResult({
        studentId,
        testSessionId: session._id,
        testSetNumber: Number(testSetNumber),
      });
    }
    const scoreBlock = {
      score: correctCount,
      total: totalQuestions,
      percentage: Number(rawPercentage.toFixed(2)),
      finalBand: band,
    };
    if (module === 'reading') {
      result.readingBand = scoreBlock as any;
    } else if (module === 'listening') {
      result.listeningBand = scoreBlock as any;
    }

    const candidateBands = [
      result.writingBand?.finalBand,
      result.speakingBand?.finalBand,
      result.readingBand?.finalBand,
      result.listeningBand?.finalBand,
    ]
      .map(bandToNumeric)
      .filter((v): v is number => v !== null);
    if (candidateBands.length) {
      const avg = candidateBands.reduce((sum, v) => sum + v, 0) / candidateBands.length;
      result.overallBand = avg.toFixed(1);
    }

    await result.save();

    res.json({
      success: true,
      score: correctCount,
      total: totalQuestions,
      percentage: rawPercentage.toFixed(2),
      band,
      sessionId: session._id
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get MCQ task (without correct answers)
 */
export const getMcqTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { module, setNumber } = req.params;
    const moduleParam = Array.isArray(module) ? module[0] : module;
    const studentId = (req as any).user.id;

    if (!moduleParam || !['reading', 'listening'].includes(moduleParam)) {
      return res.status(400).json({ error: 'Invalid module for MCQ task' });
    }

    const session = await TestSession.findOne({
      studentId,
      testSetNumber: Number(setNumber),
      status: 'in_progress',
    });
    if (!session) return res.status(404).json({ error: 'Session not found' });
    if (!session.instructionsAccepted) {
      return res.status(403).json({ error: 'Instructions must be accepted before starting the test' });
    }
    const selectedModules = session.selectedModules || ['writing', 'speaking'];
    if (!selectedModules.includes(moduleParam as 'reading' | 'listening')) {
      return res.status(403).json({ error: `${moduleParam} module is not enabled for this session` });
    }

    const task = await QuestionBank.findOne({ 
      module: moduleParam,
      testSetNumber: Number(setNumber) 
    }).select('-mcqs.correctOption'); // Security: Don't send correct answers to frontend

    if (!task) return res.status(404).json({ error: 'MCQ Task not found' });

    const mode = session.mode || 'practice';
    const moduleKey = moduleParam as 'reading' | 'listening';
    const modePolicy = {
      canRevisitTask: isActionAllowed(mode, moduleKey, 'canRevisitTask'),
      canOverwriteSubmittedTask: isActionAllowed(mode, moduleKey, 'canOverwriteSubmittedTask'),
      canUseHints: isActionAllowed(mode, moduleKey, 'canUseHints'),
      canViewSampleResponses: isActionAllowed(mode, moduleKey, 'canViewSampleResponses'),
    };
    const mediaPolicy = computeEffectiveMediaPolicy(mode, {
      allowReplay: task.allowReplay,
      allowSeek: task.allowSeek,
      playLimit: task.playLimit,
    });
    const runtimeState = (session as any).mediaRuntime?.find(
      (r: any) => r.module === moduleKey && Number(r.taskNumber) === Number(task.taskNumber || 1),
    );

    res.json({
      ...task.toObject(),
      modePolicy,
      mediaPolicy,
      serverMediaState: {
        playCount: runtimeState?.playCount || 0,
        seekCount: runtimeState?.seekCount || 0,
        blockedCount: runtimeState?.blockedCount || 0,
        lastEventAt: runtimeState?.lastEventAt || null,
      },
    });
  } catch (error) {
    next(error);
  }
};
