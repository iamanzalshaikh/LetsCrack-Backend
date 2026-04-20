import { Request, Response, NextFunction } from 'express';
/**
 * Get pending submissions list
 */
export declare const getPendingSubmissions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get specific submission details for scoring
 */
export declare const getSubmissionDetails: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Submit examiner scores and feedback
 */
export declare const submitScore: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
