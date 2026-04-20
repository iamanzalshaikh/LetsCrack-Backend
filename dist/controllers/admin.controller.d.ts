import { Request, Response, NextFunction } from 'express';
/**
 * Manage CELPIP Question Bank
 * Supports Writing, Speaking, Reading, and Listening modules
 */
export declare const createOrUpdateQuestion: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Publish student results and bands
 */
export declare const publishResults: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Manage Platform Users (Student, Examiner)
 */
export declare const getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete a user from the platform
 */
export declare const deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
