import express, { Router } from 'express';
import { submitMcqAnswers, getMcqTask, autosaveSessionState } from '../controllers/mcq.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router: Router = express.Router();

// Apply auth middleware to all MCQ routes
router.use(authMiddleware as any);

/**
 * @swagger
 * /api/mcq/task/:module/:setNumber/:taskNumber:
 *   get:
 *     summary: Get MCQ task (without correct answers)
 *     tags: [MCQ]
 */
router.get('/task/:module/:setNumber', getMcqTask);
router.get('/task/:module/:setNumber/:taskNumber', getMcqTask);

/**
 * @swagger
 * /api/mcq/submit:
 *   post:
 *     summary: Submit MCQ answers and auto-grade
 *     tags: [MCQ]
 */
router.post('/submit', submitMcqAnswers);

/**
 * @swagger
 * /api/mcq/autosave:
 *   post:
 *     summary: Autosave student progress (answers, bookmarks, timers)
 *     tags: [MCQ]
 */
router.post('/autosave', autosaveSessionState);

export default router;
