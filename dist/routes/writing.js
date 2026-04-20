import express from 'express';
import { autoSave, restore, submit } from '../controllers/writing.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router();
// Apply auth middleware to all writing routes
router.use(authMiddleware);
/**
 * @swagger
 * /api/writing/autosave:
 *   post:
 *     summary: Auto-save writing response
 *     tags: [Writing]
 */
router.post('/autosave', autoSave);
/**
 * @swagger
 * /api/writing/restore/:studentId/:setNumber/:taskNumber:
 *   get:
 *     summary: Restore auto-saved response
 *     tags: [Writing]
 */
router.get('/restore/:studentId/:setNumber/:taskNumber', restore);
/**
 * @swagger
 * /api/writing/submit:
 *   post:
 *     summary: Submit writing response
 *     tags: [Writing]
 */
router.post('/submit', submit);
export default router;
//# sourceMappingURL=writing.js.map