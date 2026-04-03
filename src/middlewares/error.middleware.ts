import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled Application Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: JSON.stringify(req.body).substring(0, 500), // Log first 500 chars
    user: (req as any).user?.id
  });

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
    status: statusCode,
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorHandler;
