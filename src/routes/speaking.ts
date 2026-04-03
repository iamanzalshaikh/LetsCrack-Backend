import express, { Router } from 'express';
import multer from 'multer';
import { saveRecording, getTask } from '../controllers/speaking.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router: Router = express.Router();

// Multer in-memory storage configuration
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Apply auth middleware to all speaking routes
router.use(authMiddleware as any);

/**
 * @swagger
 * /api/speaking/save-recording:
 *   post:
 *     summary: Upload recorded audio to S3 after speaking task
 *     tags: [Speaking]
 */
router.post('/save-recording', upload.single('audioFile'), saveRecording);

/**
 * @swagger
 * /api/speaking/task/:taskNumber:
 *   get:
 *     summary: Get task details (prompt, image, timings)
 *     tags: [Speaking]
 */
router.get('/task/:taskNumber', getTask);

export default router;
