import express from 'express';
import { submitMcqAnswers, getMcqTask } from '../controllers/mcq.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router();
// Apply auth middleware to all MCQ routes
router.use(authMiddleware);
/**
 * @swagger
 * /api/mcq/task/:module/:setNumber:
 *   get:
 *     summary: Get MCQ task (without correct answers)
 *     tags: [MCQ]
 */
router.get('/task/:module/:setNumber', getMcqTask);
/**
 * @swagger
 * /api/mcq/submit:
 *   post:
 *     summary: Submit MCQ answers and auto-grade
 *     tags: [MCQ]
 */
router.post('/submit', submitMcqAnswers);
export default router;
//# sourceMappingURL=mcq.js.map