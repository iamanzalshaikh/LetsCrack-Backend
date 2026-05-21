import express, { Router } from 'express';
import multer from 'multer';
import {
  createOrUpdateQuestion,
  publishResults,
  getAllUsers,
  deleteUser,
  uploadMedia,
  createOrUpdateTestSet,
  publishTestSet,
  getTestSets,
  bulkImportQuestions,
  getRetentionReport,
  getTestSetQuestions,
} from '../controllers/admin.controller.js';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware.js';

const router: Router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

// Apply auth and admin role middleware to all admin routes
router.use(authMiddleware as any);
router.use(requireRole(['admin']));

/**
 * @swagger
 * /api/admin/question:
 *   post:
 *     summary: Create or update any module question (Writing, Speaking, Reading, Listening)
 *     tags: [Admin]
 */
router.post('/question', createOrUpdateQuestion);
router.post('/question/bulk', bulkImportQuestions);

/**
 * @swagger
 * /api/admin/test-set:
 *   post:
 *     summary: Create or update test set metadata (draft/published)
 *     tags: [Admin]
 */
router.post('/test-set', createOrUpdateTestSet);

/**
 * @swagger
 * /api/admin/test-sets:
 *   get:
 *     summary: Get test set list for admin
 *     tags: [Admin]
 */
router.get('/test-sets', getTestSets);
router.get('/test-set/:testSetNumber/questions', getTestSetQuestions);
router.get('/retention/report', getRetentionReport);

/**
 * @swagger
 * /api/admin/test-set/:testSetNumber/publish:
 *   post:
 *     summary: Publish test set
 *     tags: [Admin]
 */
router.post('/test-set/:testSetNumber/publish', publishTestSet);

/**
 * @swagger
 * /api/admin/media/upload:
 *   post:
 *     summary: Upload question image/media to Cloudinary
 *     tags: [Admin]
 */
router.post('/media/upload', upload.single('file'), uploadMedia);

/**
 * @swagger
 * /api/admin/results/publish/:resultId:
 *   post:
 *     summary: Publish student results and bands
 *     tags: [Admin]
 */
router.post('/results/publish/:resultId', publishResults);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all platform users
 *     tags: [Admin]
 */
router.get('/users', getAllUsers);

/**
 * @swagger
 * /api/admin/user/:userId:
 *   delete:
 *     summary: Delete a platform user
 *     tags: [Admin]
 */
router.delete('/user/:userId', deleteUser);

export default router;
