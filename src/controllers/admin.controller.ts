import { Request, Response, NextFunction } from 'express';
import QuestionBank from '../models/QuestionBank.js';
import WritingQuestion from '../models/WritingQuestion.js';
import SpeakingQuestion from '../models/SpeakingQuestion.js';
import TestResult from '../models/TestResult.js';
import TestSession from '../models/TestSession.js';
import User from '../models/User.js';
import TestSet from '../models/TestSet.js';
import { sendResultEmail } from '../utils/email.js';
import logger from '../utils/logger.js';
import { uploadOnCloudinary } from '../config/cloudinary.js';

/**
 * Load writing + speaking questions for a test set (admin builder)
 */
export const getTestSetQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const n = Number(req.params.testSetNumber);
    if (!Number.isFinite(n) || n < 1) {
      return res.status(400).json({ error: 'Invalid testSetNumber' });
    }
    const [testSet, writing, speaking] = await Promise.all([
      TestSet.findOne({ testSetNumber: n }).lean(),
      WritingQuestion.find({ testSetNumber: n }).lean(),
      SpeakingQuestion.find({ testSetNumber: n })
        .sort({ taskNumber: 1, subTask: 1 })
        .lean(),
    ]);
    return res.json({ testSet, writing, speaking });
  } catch (error) {
    next(error);
  }
};

/**
 * Manage CELPIP Question Bank
 * Supports Writing, Speaking, Reading, and Listening modules
 */
export const createOrUpdateQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { module, testSetNumber, taskNumber, subTask, ...content } = req.body;
    
    // Validate module
    const validModules = ['writing', 'speaking', 'reading', 'listening'];
    if (!validModules.includes(module)) {
      return res.status(400).json({ error: 'Invalid module type' });
    }

    if ((module === 'writing' || module === 'speaking') && (!Number.isFinite(Number(taskNumber)) || Number(taskNumber) <= 0)) {
      return res.status(400).json({ error: 'taskNumber is required for writing/speaking' });
    }

    let question: any;
    if (module === 'writing') {
      question = await WritingQuestion.findOneAndUpdate(
        { testSetNumber: Number(testSetNumber), taskNumber: Number(taskNumber) },
        { module: 'writing', testSetNumber: Number(testSetNumber), taskNumber: Number(taskNumber), ...content, updatedAt: new Date() },
        { new: true, upsert: true },
      );
    } else if (module === 'speaking') {
      question = await SpeakingQuestion.findOneAndUpdate(
        {
          testSetNumber: Number(testSetNumber),
          taskNumber: Number(taskNumber),
          subTask: subTask || null,
        },
        {
          module: 'speaking',
          testSetNumber: Number(testSetNumber),
          taskNumber: Number(taskNumber),
          subTask: subTask || null,
          ...content,
          updatedAt: new Date(),
        },
        { new: true, upsert: true },
      );
    } else {
      // Reading/Listening remain in QuestionBank for MCQ payload compatibility.
      question = await QuestionBank.findOneAndUpdate(
        { module, testSetNumber: Number(testSetNumber) },
        { module, testSetNumber: Number(testSetNumber), ...content, updatedAt: new Date() },
        { new: true, upsert: true },
      );
    }

    res.json({ 
      success: true, 
      questionId: question._id,
      created: false,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Bulk import QuestionBank records with validation/upsert.
 * Body: { questions: QuestionPayload[], dryRun?: boolean }
 */
export const bulkImportQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { questions, dryRun = false } = req.body as { questions?: any[]; dryRun?: boolean };
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'questions[] is required' });
    }
    if (questions.length > 500) {
      return res.status(400).json({ error: 'Maximum 500 questions per request' });
    }

    const validModules = new Set(['writing', 'speaking', 'reading', 'listening']);
    const validationErrors: Array<{ index: number; error: string }> = [];
    const writingOperations: any[] = [];
    const speakingOperations: any[] = [];
    const mcqOperations: any[] = [];

    questions.forEach((item, index) => {
      const module = item?.module;
      const testSetNumber = Number(item?.testSetNumber);
      const taskNumber = Number(item?.taskNumber);

      if (!validModules.has(module)) {
        validationErrors.push({ index, error: 'Invalid module' });
        return;
      }
      if (!Number.isFinite(testSetNumber) || testSetNumber <= 0) {
        validationErrors.push({ index, error: 'Invalid testSetNumber' });
        return;
      }
      
      // Strict validation for Writing/Speaking ONLY on dryRun (import verification)
      if (dryRun) {
        if ((module === 'writing' || module === 'speaking') && (!Number.isFinite(taskNumber) || taskNumber <= 0)) {
          validationErrors.push({ index, error: 'taskNumber is required' });
        }
        if (module === 'writing' && (!Number.isFinite(Number(item?.timeLimit)) || Number(item.timeLimit) <= 0)) {
          validationErrors.push({ index, error: 'timeLimit is required for writing' });
        }
        if (module === 'speaking') {
          if (!item?.prompt || !Number.isFinite(Number(item?.prepTime)) || !Number.isFinite(Number(item?.speakingTime))) {
            validationErrors.push({ index, error: 'prompt, prepTime and speakingTime are required for speaking' });
          }
        }
        if (validationErrors.length > 0) return;
      }
      if ((module === 'reading' || module === 'listening') && (!Array.isArray(item?.mcqs) || item.mcqs.length === 0)) {
        validationErrors.push({ index, error: 'mcqs[] is required for reading/listening' });
        return;
      }

      const { module: _module, testSetNumber: _set, taskNumber: _task, ...rest } = item;
      if (module === 'writing') {
        writingOperations.push({
          updateOne: {
            filter: {
              testSetNumber,
              taskNumber,
            },
            update: {
              $set: {
                module: 'writing',
                testSetNumber,
                taskNumber,
                ...rest,
                updatedAt: new Date(),
              },
              $setOnInsert: {
                createdAt: new Date(),
              },
            },
            upsert: true,
          },
        });
      } else if (module === 'speaking') {
        speakingOperations.push({
          updateOne: {
            filter: {
              testSetNumber,
              taskNumber,
              subTask: item?.subTask || null,
            },
            update: {
              $set: {
                module: 'speaking',
                testSetNumber,
                taskNumber,
                subTask: item?.subTask || null,
                ...rest,
                updatedAt: new Date(),
              },
              $setOnInsert: {
                createdAt: new Date(),
              },
            },
            upsert: true,
          },
        });
      } else {
        mcqOperations.push({
          updateOne: {
            filter: {
              module,
              testSetNumber,
            },
            update: {
              $set: {
                module,
                testSetNumber,
                ...rest,
                updatedAt: new Date(),
              },
              $setOnInsert: {
                createdAt: new Date(),
              },
            },
            upsert: true,
          },
        });
      }
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({
        error: 'Bulk import validation failed',
        total: questions.length,
        invalid: validationErrors.length,
        errors: validationErrors.slice(0, 50),
      });
    }

    if (dryRun) {
      return res.json({
        success: true,
        dryRun: true,
        validRecords: writingOperations.length + speakingOperations.length + mcqOperations.length,
      });
    }

    const [writingResult, speakingResult, mcqResult] = await Promise.all([
      writingOperations.length ? WritingQuestion.bulkWrite(writingOperations, { ordered: false }) : null,
      speakingOperations.length ? SpeakingQuestion.bulkWrite(speakingOperations, { ordered: false }) : null,
      mcqOperations.length ? QuestionBank.bulkWrite(mcqOperations, { ordered: false }) : null,
    ]);

    const totalMatched =
      (writingResult?.matchedCount || 0) +
      (speakingResult?.matchedCount || 0) +
      (mcqResult?.matchedCount || 0);
    const totalModified =
      (writingResult?.modifiedCount || 0) +
      (speakingResult?.modifiedCount || 0) +
      (mcqResult?.modifiedCount || 0);
    const totalUpserted =
      (writingResult?.upsertedCount || 0) +
      (speakingResult?.upsertedCount || 0) +
      (mcqResult?.upsertedCount || 0);

    const importedCount = writingOperations.length + speakingOperations.length + mcqOperations.length;
    return res.json({
      success: true,
      imported: importedCount,
      matched: totalMatched,
      modified: totalModified,
      upserted: totalUpserted,
      buckets: {
        writing: writingOperations.length,
        speaking: speakingOperations.length,
        mcq: mcqOperations.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Publish student results and bands
 */
export const publishResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { resultId } = req.params;
    
    const result = await TestResult.findById(resultId)
      .populate('studentId', 'firstName lastName email')
      .populate('testSessionId');

    if (!result) return res.status(404).json({ error: 'Test result not found' });

    // Mark as published
    result.publishedAt = new Date();
    
    // Logic for generating certificate URL would go here
    result.certificateUrl = `https://letscrackenglish.com/certificates/${result._id}`;
    
    await result.save();

    // Trigger Email Notification
    const student = result.studentId as any;
    if (student && student.email) {
      await sendResultEmail(
        student.email, 
        student.firstName, 
        result.testSetNumber || 1, 
        result.overallBand || 'N/A'
      );
    }

    res.json({ 
      success: true, 
      publishedAt: result.publishedAt, 
      certificateUrl: result.certificateUrl 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Manage Platform Users (Student, Examiner)
 */
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    
    const users = await User.find(filter).select('-password');
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a user from the platform
 */
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload image/media asset to Cloudinary and return URL
 */
export const uploadMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = (req as any).file as Express.Multer.File | undefined;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const isSupportedMedia =
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/') ||
      file.mimetype.startsWith('audio/');
    if (!isSupportedMedia) {
      return res
        .status(400)
        .json({ error: 'Only image, video, or audio uploads are supported on this endpoint' });
    }

    const uploadedUrl = await uploadOnCloudinary(file.buffer, { folder: 'lce-question-media' });
    if (!uploadedUrl) {
      return res.status(500).json({ error: 'Failed to upload media to Cloudinary' });
    }

    return res.status(201).json({
      success: true,
      mediaUrl: uploadedUrl,
      mimeType: file.mimetype,
      size: file.size,
      provider: 'cloudinary',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create or update test set metadata (draft lifecycle)
 */
export const createOrUpdateTestSet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      testSetNumber,
      title,
      description,
      modeSupport,
      modules,
      estimatedTimeMinutes,
      instructions,
      status,
    } = req.body;

    if (!testSetNumber || !title) {
      return res.status(400).json({ error: 'testSetNumber and title are required' });
    }

    const nextStatus = status === 'published' ? 'published' : 'draft';
    const existing = await TestSet.findOne({ testSetNumber: Number(testSetNumber) });

    const incomingInstructions = instructions || {};
    const payload: any = {
      title,
      description: description || '',
      modeSupport: Array.isArray(modeSupport) && modeSupport.length ? modeSupport : ['practice', 'simulation'],
      modules: Array.isArray(modules) && modules.length ? modules : ['listening', 'reading', 'writing', 'speaking'],
      estimatedTimeMinutes: Number(estimatedTimeMinutes || 180),
      instructions: {
        practice: incomingInstructions.practice || '',
        simulation: incomingInstructions.simulation || '',
        writingInstructionText: incomingInstructions.writingInstructionText || '',
        writingInstructionVideoUrl: incomingInstructions.writingInstructionVideoUrl || '',
        speakingInstructionText: incomingInstructions.speakingInstructionText || '',
        speakingInstructionVideoUrl: incomingInstructions.speakingInstructionVideoUrl || '',
      },
      status: nextStatus,
      updatedAt: new Date(),
    };

    if (nextStatus === 'published') {
      payload.publishedAt = new Date();
    }

    let testSet;
    if (existing) {
      // Update: $set fields + $inc version (safe, no conflict)
      testSet = await TestSet.findOneAndUpdate(
        { testSetNumber: Number(testSetNumber) },
        { $set: payload, $inc: { version: 1 } },
        { new: true },
      );
    } else {
      // Insert: $set fields + $setOnInsert for version/createdAt
      testSet = await TestSet.findOneAndUpdate(
        { testSetNumber: Number(testSetNumber) },
        { $set: payload, $setOnInsert: { version: 1, createdAt: new Date() } },
        { new: true, upsert: true },
      );
    }

    return res.json({ success: true, testSet });
  } catch (error) {
    next(error);
  }
};


/**
 * Publish a test set
 */
export const publishTestSet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { testSetNumber } = req.params;
    const testSet = await TestSet.findOneAndUpdate(
      { testSetNumber: Number(testSetNumber) },
      { $set: { status: 'published', publishedAt: new Date(), updatedAt: new Date() }, $inc: { version: 1 } },
      { new: true },
    );
    if (!testSet) return res.status(404).json({ error: 'Test set not found' });
    return res.json({ success: true, testSet });
  } catch (error) {
    next(error);
  }
};

/**
 * List test sets for admin
 */
export const getTestSets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const sets = await TestSet.find(filter).sort({ testSetNumber: 1 });
    return res.json({ testSets: sets });
  } catch (error) {
    next(error);
  }
};

/**
 * Retention purge status/metrics for admin dashboards
 */
export const getRetentionReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const now = new Date();
    const [pendingCount, purgedCount, nextPurgeSession, recentPurged] = await Promise.all([
      TestSession.countDocuments({
        purgeAt: { $lte: now },
        purgedAt: { $exists: false },
      }),
      TestSession.countDocuments({
        purgedAt: { $exists: true },
      }),
      TestSession.findOne({
        purgeAt: { $gt: now },
        purgedAt: { $exists: false },
      })
        .sort({ purgeAt: 1 })
        .select('testSetNumber purgeAt studentId status'),
      TestSession.find({
        purgedAt: { $exists: true },
      })
        .sort({ purgedAt: -1 })
        .limit(20)
        .select('testSetNumber studentId status purgeAt purgedAt'),
    ]);

    return res.json({
      generatedAt: now,
      metrics: {
        pendingPurge: pendingCount,
        totalPurged: purgedCount,
      },
      nextScheduledCandidate: nextPurgeSession,
      recentPurgedSessions: recentPurged,
    });
  } catch (error) {
    next(error);
  }
};
