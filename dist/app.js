import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env.js';
import { swaggerSpec } from './docs/swagger.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { apiLimiter } from './middlewares/rateLimit.middleware.js';
import authRoutes from './routes/auth.js';
import writingRoutes from './routes/writing.js';
import speakingRoutes from './routes/speaking.js';
import examinerRoutes from './routes/examiner.js';
import adminRoutes from './routes/admin.js';
import studentRoutes from './routes/student.js';
import mcqRoutes from './routes/mcq.js';
const app = express();
// Middlewares
app.use(helmet());
app.use(cors({
    origin: [env.CORS_ORIGIN, env.FRONTEND_URL],
    credentials: true,
}));
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
// Rate Limiter
app.use('/api', apiLimiter);
// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/writing', writingRoutes);
app.use('/api/speaking', speakingRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/mcq', mcqRoutes);
app.use('/api/examiner', examinerRoutes);
app.use('/api/admin', adminRoutes);
// Root Endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: "Let's Crack English API is running" });
});
// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Resource Not Found' });
});
// Global Error Handler
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map