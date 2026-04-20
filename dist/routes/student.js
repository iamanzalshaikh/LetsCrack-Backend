import express from 'express';
import { getResults, getProgress, getCertificate, startTest } from '../controllers/student.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router();
// Apply auth middleware to all student routes
router.use(authMiddleware);
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
 * /api/student/progress:
 *   get:
 *     summary: Get history of all test attempts
 *     tags: [Student]
 */
router.get('/progress', getProgress);
/**
 * @swagger
 * /api/student/certificate/:resultId:
 *   get:
 *     summary: Get Certificate PDF stream
 *     tags: [Student]
 */
router.get('/certificate/:resultId', getCertificate);
export default router;
//# sourceMappingURL=student.js.map