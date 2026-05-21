import express, { Router } from 'express';
import {
  getResults,
  getProgress,
  getCertificate,
  getAiEvaluationReport,
  startTest,
  getAvailableTests,
  getResultStatus,
  confirmInstructions,
  endTestSession,
  getTestInstructions,
  recordMediaRuntimeEvent,
} from '../controllers/student.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router: Router = express.Router();

// Apply auth middleware to all student routes
router.use(authMiddleware as any);

/**
 * @swagger
 * /api/student/tests:
 *   get:
 *     summary: Get all available test sets
 *     tags: [Student]
 */
router.get('/tests', getAvailableTests);

/**
 * @swagger
 * /api/student/results/:testSetNumber:
 *   get:
 *     summary: Get results for specific test set
 *     tags: [Student]
 */
router.get('/results/:testSetNumber', getResults);

/**
 * @swagger
 * /api/student/start-test/:testSetNumber:
 *   post:
 *     summary: Start a new test session
 *     tags: [Student]
 */
router.post('/start-test/:testSetNumber', startTest);

/**
 * @swagger
 * /api/student/session/:sessionId/confirm-instructions:
 *   post:
 *     summary: Confirm instructions accepted before starting tasks
 *     tags: [Student]
 */
router.post('/session/:sessionId/confirm-instructions', confirmInstructions);

/**
 * @swagger
 * /api/student/session/:sessionId/end:
 *   post:
 *     summary: End test early and cancel pending AI grading jobs
 *     tags: [Student]
 */
router.post('/session/:sessionId/end', endTestSession);

/**
 * @swagger
 * /api/student/test-instructions/:testSetNumber:
 *   get:
 *     summary: Get instructions content for a test set and mode
 *     tags: [Student]
 */
router.get('/test-instructions/:testSetNumber', getTestInstructions);

/**
 * @swagger
 * /api/student/progress:
 *   get:
 *     summary: Get history of all test attempts
 *     tags: [Student]
 */
router.get('/progress', getProgress);

/**
 * @swagger
 * /api/student/result-status/:sessionId:
 *   get:
 *     summary: Get grading and submission status for active session
 *     tags: [Student]
 */
router.get('/result-status/:sessionId', getResultStatus);

/**
 * @swagger
 * /api/student/media/runtime-event:
 *   post:
 *     summary: Record media interaction and get enforcement decision
 *     tags: [Student]
 */
router.post('/media/runtime-event', recordMediaRuntimeEvent);

/**
 * @swagger
 * /api/student/certificate/:resultId:
 *   get:
 *     summary: Get Certificate PDF stream
 *     tags: [Student]
 */
router.get('/certificate/:resultId', getCertificate);

/**
 * @swagger
 * /api/student/ai-report/:testSetNumber:
 *   get:
 *     summary: Download task-wise AI evaluation report PDF
 *     tags: [Student]
 */
router.get('/ai-report/:testSetNumber', getAiEvaluationReport);

export default router;
