import { Request, Response, NextFunction } from 'express';
/**
 * Submit MCQ / Reading / Listening answers and auto-grade.
 * Body: { testSetNumber, module, taskNumber, answers }
 */
export declare const submitMcqAnswers: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get MCQ task (without correct answers)
 */
export declare const getMcqTask: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Autosave student test state (answers, timers, bookmarks)
 */
export declare const autosaveSessionState: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
