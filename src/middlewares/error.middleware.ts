import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

const dupKeyEmail = (err: { message?: string; keyValue?: Record<string, unknown> }) =>
  typeof err.message === 'string' && err.message.includes('email') ||
  Boolean(err?.keyValue && 'email' in (err.keyValue as object));

/** Map mongoose / Mongo errors → HTTP statuses so routes don’t all become opaque 500s. */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled Application Error:', {
    message: err.message,
    name: err.name,
    code: err.code,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: JSON.stringify(req.body).substring(0, 500), // Log first 500 chars
    user: (req as any).user?.id,
  });

  let statusCode = typeof err.status === 'number' ? err.status : 500;
  let message = typeof err.message === 'string' ? err.message : 'Internal Server Error';

  // Mongo duplicate key (e.g. email unique index)
  if (err.code === 11000 && dupKeyEmail(err)) {
    statusCode = 409;
    message = 'User with this email already exists';
  } else if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate value — resource already exists';
  } else if (err.name === 'ValidationError' && typeof err.errors === 'object') {
    statusCode = 400;
    const first =
      typeof err.errors === 'object'
        ? String(Object.values(err.errors)[0] && (Object.values(err.errors)[0] as { message?: string }).message)
        : '';
    message = first || message;
  } else if (err.name === 'CastError') {
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    message,
    status: statusCode,
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorHandler;
