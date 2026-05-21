import { Request, Response, NextFunction } from 'express';
/**
 * Load writing + speaking questions for a test set (admin builder)
 */
export declare const getTestSetQuestions: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Manage CELPIP Question Bank
 * Supports Writing, Speaking, Reading, and Listening modules
 */
export declare const createOrUpdateQuestion: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Bulk import QuestionBank records with validation/upsert.
 * Body: { questions: QuestionPayload[], dryRun?: boolean }
 */
export declare const bulkImportQuestions: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
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
/**
 * Upload image/media asset to Cloudinary and return URL
 */
export declare const uploadMedia: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Create or update test set metadata (draft lifecycle)
 */
export declare const createOrUpdateTestSet: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Publish a test set
 */
export declare const publishTestSet: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * List test sets for admin
 */
export declare const getTestSets: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Retention purge status/metrics for admin dashboards
 */
export declare const getRetentionReport: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
