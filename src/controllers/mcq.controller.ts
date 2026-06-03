import { Request, Response, NextFunction } from 'express';
import TestSession from '../models/TestSession.js';
import QuestionBank from '../models/QuestionBank.js';
import TestSet from '../models/TestSet.js';
import TestResult from '../models/TestResult.js';
import WritingQuestion from '../models/WritingQuestion.js';
import SpeakingQuestion from '../models/SpeakingQuestion.js';
import ScoreMapping from '../models/ScoreMapping.js';
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
 * Grade student answers against a generic right panel section array.
 * Support mixed correct answers (index numbers, string labels, arrays of strings, etc.).
 */
const gradeGenericRightPanel = (sections: any[], studentAnswers: Record<string, any>): { correct: number, total: number } => {
  let correct = 0;
  let total = 0;
  
  if (!sections || !Array.isArray(sections)) return { correct, total };

  for (const section of sections) {
    if (section.questions && Array.isArray(section.questions)) {
      for (const q of section.questions) {
        if (!q.id) continue;
        total++;
        const answer = studentAnswers[q.id];
        if (answer !== undefined && answer !== null && answer !== '') {
          if (Array.isArray(q.correctAnswer) && Array.isArray(answer)) {
            const sortedA = [...q.correctAnswer].sort().map(String);
            const sortedB = [...answer].sort().map(String);
            if (JSON.stringify(sortedA) === JSON.stringify(sortedB)) {
              correct++;
            }
          } else if (
            !Array.isArray(q.correctAnswer) &&
            Number.isFinite(Number(q.correctAnswer)) &&
            Number.isFinite(Number(answer)) &&
            Number(q.correctAnswer) === Number(answer)
          ) {
            correct++;
          } else if (String(q.correctAnswer).trim().toLowerCase() === String(answer).trim().toLowerCase()) {
            correct++;
          }
        }
      }
    }
    if (section.matchingQuestions && Array.isArray(section.matchingQuestions)) {
      for (const mq of section.matchingQuestions) {
        if (!mq.id) continue;
        total++;
        const answer = studentAnswers[mq.id];
        if (answer !== undefined && answer !== null && answer !== '') {
          if (String(mq.correctParagraph).trim().toLowerCase() === String(answer).trim().toLowerCase()) {
            correct++;
          }
        }
      }
    }
  }
  return { correct, total };
};

const resolveOptionText = (options: string[] | undefined, value: unknown): string => {
  if (value === undefined || value === null || value === '') return '';
  if (Array.isArray(options)) {
    const idx = Number(value);
    if (!Number.isFinite(idx) || options[idx] === undefined) return String(value);
    return options[idx];
  }
  return String(value);
};

const READING_PART_TITLES: Record<number, string> = {
  1: 'Reading Part 1: Reading Correspondence',
  2: 'Reading Part 2: Reading to Apply a Diagram',
  3: 'Reading Part 3: Reading for Information',
  4: 'Reading Part 4: Reading for Viewpoints',
};

const buildReadingBreakdown = (
  bankTasks: any[],
  answerDict: Record<string, unknown>,
) => {
  const breakdown: Array<{
    partNumber: number;
    questionCode: string;
    questionLabel: string;
    answerKey: string;
    yourAnswer: string;
    isCorrect: boolean;
    isSeparator?: boolean;
    separatorText?: string;
  }> = [];

  const sorted = [...bankTasks].sort(
    (a, b) => Number(a.taskNumber || 0) - Number(b.taskNumber || 0),
  );

  sorted.forEach((task, partIdx) => {
    const partNum = Number(task.taskNumber) || partIdx + 1;
    const partTitle =
      READING_PART_TITLES[partNum] ||
      `Reading Part ${partNum}: ${task.title || 'Reading'}`;

    if (partIdx > 0) {
      breakdown.push({
        partNumber: partNum,
        questionCode: '',
        questionLabel: '',
        answerKey: '',
        yourAnswer: '',
        isCorrect: false,
        isSeparator: true,
        separatorText: `Return to the beginning of Part ${partNum - 1}`,
      });
    }

    let qInPart = 0;
    const sections = task.rightPanel?.sections;
    if (!Array.isArray(sections)) return;

    for (const section of sections) {
      if (section.matchingQuestions && Array.isArray(section.matchingQuestions)) {
        for (const mq of section.matchingQuestions) {
          if (!mq.id) continue;
          qInPart += 1;
          const yourAnswer = answerDict[mq.id];
          const answerKey = mq.correctParagraph || '—';
          const isCorrect =
            yourAnswer !== undefined &&
            String(mq.correctParagraph).trim().toLowerCase() ===
              String(yourAnswer).trim().toLowerCase();
          breakdown.push({
            partNumber: partNum,
            questionCode: `${partTitle} - Q${qInPart}`,
            questionLabel: mq.statement || '',
            answerKey,
            yourAnswer: yourAnswer !== undefined ? String(yourAnswer) : '',
            isCorrect,
          });
        }
        continue;
      }
      if (!section.questions || !Array.isArray(section.questions)) continue;
      for (const q of section.questions) {
        if (!q.id) continue;
        qInPart += 1;
        const yourAnswer = answerDict[q.id];
        const answerKey = resolveOptionText(q.options, q.correctAnswer) || '—';
        const yourText = resolveOptionText(q.options, yourAnswer);
        const isCorrect =
          yourAnswer !== undefined &&
          yourAnswer !== null &&
          yourAnswer !== '' &&
          (Array.isArray(q.correctAnswer) && Array.isArray(yourAnswer)
            ? JSON.stringify([...q.correctAnswer].sort().map(String)) ===
              JSON.stringify([...yourAnswer].sort().map(String))
            : String(q.correctAnswer).trim().toLowerCase() ===
              String(yourAnswer).trim().toLowerCase());
        breakdown.push({
          partNumber: partNum,
          questionCode: `${partTitle} - Q${qInPart}`,
          questionLabel: q.label || `Question ${q.order ?? qInPart}`,
          answerKey,
          yourAnswer: yourText,
          isCorrect,
        });
      }
    }
  });

  return breakdown;
};

/**
 * Submit MCQ / Reading / Listening answers and auto-grade.
 * Body: { testSetNumber, module, taskNumber, answers }
 */
export const submitMcqAnswers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user.id;
    const { testSetNumber, module, taskNumber, answers } = req.body as {
      testSetNumber: number;
      module: 'reading' | 'listening';
      taskNumber?: number;
      answers: Array<{ questionId: string; selectedOption?: number; answer?: any }>;
    };

    if (!['reading', 'listening'].includes(module)) {
      return res.status(400).json({ error: 'Invalid module for MCQ submission' });
    }

    const modeForSubmit = (await TestSession.findOne({
      studentId,
      testSetNumber: Number(testSetNumber),
      status: { $in: ['in_progress', 'submitted', 'graded'] },
    }).select('mode status')) as { mode?: string; status?: string } | null;

    const session = await TestSession.findOne({
      studentId,
      testSetNumber: Number(testSetNumber),
      status:
        modeForSubmit?.mode === 'practice'
          ? { $in: ['in_progress', 'submitted'] }
          : 'in_progress',
    });
    if (!session) {
      return res.status(404).json({
        error: 'Session not found. Start the test again from the dashboard.',
      });
    }
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

    // 1. Fetch QuestionBank questions to grade
    const filter = {
      module,
      testSetNumber: Number(testSetNumber),
      ...(taskNumber ? { taskNumber: Number(taskNumber) } : {})
    };
    const bankTasks = await QuestionBank.find(filter);

    if (!bankTasks || bankTasks.length === 0) {
      return res.status(404).json({ error: 'No question tasks found for this module/set' });
    }

    let correctCount = 0;
    let totalQuestions = 0;
    const processedResponses: any[] = [];

    // Convert flat answers list into a lookup dictionary
    const answerDict: Record<string, any> = {};
    if (Array.isArray(answers)) {
      answers.forEach((a) => {
        const val = a.answer !== undefined ? a.answer : a.selectedOption;
        if (a.questionId) {
          answerDict[a.questionId] = val;
        }
      });
    }

    // 2. Grade responses based on structure (generic sections or legacy mcqs list)
    for (const task of bankTasks) {
      const isGenericLayout = task.rightPanel && Array.isArray(task.rightPanel.sections) && task.rightPanel.sections.length > 0;
      
      if (isGenericLayout && task.rightPanel) {
        // New Layout Engine
        const gradeResult = gradeGenericRightPanel(task.rightPanel.sections, answerDict);
        correctCount += gradeResult.correct;
        totalQuestions += gradeResult.total;

        // Map answers back to responses array
        task.rightPanel.sections.forEach((sec: any) => {
          if (sec.questions) {
            sec.questions.forEach((q: any) => {
              const ansVal = answerDict[q.id];
              const isCorr = ansVal !== undefined && (
                Array.isArray(q.correctAnswer) && Array.isArray(ansVal)
                  ? JSON.stringify([...q.correctAnswer].sort().map(String)) === JSON.stringify([...ansVal].sort().map(String))
                  : String(q.correctAnswer).trim().toLowerCase() === String(ansVal).trim().toLowerCase()
              );
              processedResponses.push({
                module,
                questionId: q.id,
                selectedOption: typeof ansVal === 'number' ? ansVal : -1,
                answer: ansVal,
                isCorrect: isCorr
              });
            });
          }
          if (sec.matchingQuestions) {
            sec.matchingQuestions.forEach((mq: any) => {
              const ansVal = answerDict[mq.id];
              const isCorr = ansVal !== undefined && (
                String(mq.correctParagraph).trim().toLowerCase() === String(ansVal).trim().toLowerCase()
              );
              processedResponses.push({
                module,
                questionId: mq.id,
                selectedOption: -1,
                answer: ansVal,
                isCorrect: isCorr
              });
            });
          }
        });
      } else {
        // Legacy MCQ Array format
        const legacyMcqs = task.mcqs || [];
        totalQuestions += legacyMcqs.length;
        legacyMcqs.forEach((q: any) => {
          const ansVal = answerDict[q._id.toString()];
          const selectedOption = typeof ansVal === 'number' ? ansVal : -1;
          const isCorrect = selectedOption === q.correctOption;
          
          if (isCorrect) correctCount++;
          
          processedResponses.push({
            module,
            questionId: q._id,
            selectedOption,
            isCorrect
          });
        });
      }
    }

    // 3. Score-to-Band Mapping Lookups
    let band = 'M';
    const scoreMapping = await ScoreMapping.findOne({ module, testSetNumber: Number(testSetNumber) });

    if (scoreMapping && Array.isArray(scoreMapping.mappings) && scoreMapping.mappings.length > 0) {
      const match = scoreMapping.mappings.find((m: any) => correctCount >= m.minScore && correctCount <= m.maxScore);
      if (match) band = match.band;
    } else {
      // Fallback calculator mapping to scale 1-12
      const rawPercentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
      const clbScore = Math.round((rawPercentage / 100) * 12);
      band = calculateBand(clbScore);
    }

    // 4. Update TestSession state
    const nextResponses = [
      ...session.mcqResponses.filter((r: any) => r.module !== module),
      ...processedResponses
    ];
    session.set('mcqResponses', nextResponses);
    session.mcqScore = correctCount;

    // Persist session-level answers map as well
    if (!session.answers) {
      session.answers = new Map();
    }
    Object.entries(answerDict).forEach(([k, v]) => {
      session.answers.set(k, v);
    });

    // Check completion status
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

    // 5. Update TestResult band mapping
    let result = await TestResult.findOne({ testSessionId: session._id });
    if (!result) {
      result = new TestResult({
        studentId,
        testSessionId: session._id,
        testSetNumber: Number(testSetNumber),
      });
    }

    const rawPercentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
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

    const breakdown =
      module === 'reading'
        ? buildReadingBreakdown(bankTasks, answerDict)
        : [];

    res.json({
      success: true,
      score: correctCount,
      total: totalQuestions,
      percentage: rawPercentage.toFixed(2),
      band,
      sessionId: session._id,
      breakdown,
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
    const { module, setNumber, taskNumber } = req.params;
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

    // Support fetching by specific taskNumber (Part 1-4)
    const query = {
      module: moduleParam,
      testSetNumber: Number(setNumber),
      ...(taskNumber ? { taskNumber: Number(taskNumber) } : {})
    };

    const mode = session.mode || 'practice';
    const moduleKey = moduleParam as 'reading' | 'listening';
    const canViewAnswerKey = isActionAllowed(mode, moduleKey, 'canViewSampleResponses');

    let taskQuery = QuestionBank.findOne(query);
    if (!canViewAnswerKey) {
      taskQuery = taskQuery.select(
        '-mcqs.correctOption -rightPanel.sections.questions.correctAnswer -rightPanel.sections.matchingQuestions.correctParagraph',
      );
    }

    const [task, testSet] = await Promise.all([
      taskQuery,
      TestSet.findOne({ testSetNumber: Number(setNumber) }).select('instructions').lean(),
    ]);

    if (!task) return res.status(404).json({ error: 'MCQ Task not found' });
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
      testSet,
      sessionMode: mode,
      modePolicy,
      mediaPolicy,
      serverMediaState: {
        playCount: runtimeState?.playCount || 0,
        seekCount: runtimeState?.seekCount || 0,
        blockedCount: runtimeState?.blockedCount || 0,
        lastEventAt: runtimeState?.lastEventAt || null,
      },
      // Send attempt persistent details back to frontend
      attemptState: session.attemptState,
      remainingSeconds: session.remainingSeconds,
      answers:
        session.answers instanceof Map
          ? Object.fromEntries(session.answers.entries())
          : session.answers || {},
      reviewStatus:
        session.reviewStatus instanceof Map
          ? Object.fromEntries(session.reviewStatus.entries())
          : session.reviewStatus || {},
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Autosave student test state (answers, timers, bookmarks)
 */
export const autosaveSessionState = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user.id;
    const { testSetNumber, module, attemptState, remainingSeconds, answers, reviewStatus } = req.body;

    const session = await TestSession.findOne({
      studentId,
      testSetNumber: Number(testSetNumber),
      status: 'in_progress'
    });

    if (!session) {
      return res.status(404).json({ error: 'In-progress session not found for this test' });
    }

    if (attemptState) {
      session.attemptState = attemptState;
    }
    if (remainingSeconds !== undefined && remainingSeconds !== null) {
      session.remainingSeconds = remainingSeconds;
    }
    if (answers && typeof answers === 'object') {
      if (!session.answers) session.answers = new Map();
      Object.entries(answers).forEach(([k, v]) => {
        session.answers.set(k, v);
      });
    }
    if (reviewStatus && typeof reviewStatus === 'object') {
      if (!session.reviewStatus) session.reviewStatus = new Map();
      Object.entries(reviewStatus).forEach(([k, v]) => {
        session.reviewStatus.set(k, Boolean(v));
      });
    }

    await session.save();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
