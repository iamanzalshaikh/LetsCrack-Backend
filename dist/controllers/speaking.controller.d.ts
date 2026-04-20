import { Request, Response, NextFunction } from 'express';
/**
 * Upload recording to S3 and save URL in TestSession
 */
export declare const saveRecording: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get task details for the student
 */
export declare const getTask: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
