import express from 'express';
import { autoSave, restore, submit, getTask, recordSimulationFocusLoss, recordSimulationIntegrity, } from '../controllers/writing.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router();
// Apply auth middleware to all writing routes
router.use(authMiddleware);
/**
 * @swagger
 * /api/writing/task/:setNumber/:taskNumber:
 *   get:
 *     summary: Get writing task prompt
 *     tags: [Writing]
 */
router.get('/task/:setNumber/:taskNumber', getTask);
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
 * /api/writing/restore/:setNumber/:taskNumber:
 *   get:
 *     summary: Restore auto-saved response
 *     tags: [Writing]
 */
router.get('/restore/:setNumber/:taskNumber', restore);
/**
 * @swagger
 * /api/writing/submit:
 *   post:
 *     summary: Submit writing response
 *     tags: [Writing]
 */
router.post('/submit', submit);
/**
 * Simulation: client reports tab/window hidden (best-effort integrity signal).
 */
router.post('/simulation-focus-loss', recordSimulationFocusLoss);
/** Batch simulation integrity timeline (visibility, blur, fullscreen, paste, …). */
router.post('/simulation-integrity', recordSimulationIntegrity);
export default router;
//# sourceMappingURL=writing.js.map