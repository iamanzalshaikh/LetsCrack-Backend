import { Router } from 'express';

const router: Router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', server: 'letscrack-backend' });
});

export default router;
