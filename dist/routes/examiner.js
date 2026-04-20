import express from 'express';
import { getPendingSubmissions, getSubmissionDetails, submitScore } from '../controllers/examiner.controller.js';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware.js';
const router = express.Router();
// Apply auth and examiner role middleware to all examiner routes
router.use(authMiddleware);
router.use(requireRole(['examiner', 'admin']));
/**
 * @swagger
 * /api/examiner/submissions:
 *   get:
 *     summary: Get pending submissions list
 *     tags: [Examiner]
 */
router.get('/submissions', getPendingSubmissions);
/**
 * @swagger
 * /api/examiner/submission/:submissionId/details:
 *   get:
 *     summary: Get specific submission details for scoring
 *     tags: [Examiner]
 */
router.get('/submission/:submissionId/details', getSubmissionDetails);
/**
 * @swagger
 * /api/examiner/score:
 *   post:
 *     summary: Submit examiner scores and feedback
 *     tags: [Examiner]
 */
router.post('/score', submitScore);
export default router;
//# sourceMappingURL=examiner.js.map