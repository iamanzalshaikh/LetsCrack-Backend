import express from 'express';
import { createOrUpdateQuestion, publishResults, getAllUsers, deleteUser } from '../controllers/admin.controller.js';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware.js';
const router = express.Router();
// Apply auth and admin role middleware to all admin routes
router.use(authMiddleware);
router.use(requireRole(['admin']));
/**
 * @swagger
 * /api/admin/question:
 *   post:
 *     summary: Create or update any module question (Writing, Speaking, Reading, Listening)
 *     tags: [Admin]
 */
router.post('/question', createOrUpdateQuestion);
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
//# sourceMappingURL=admin.js.map