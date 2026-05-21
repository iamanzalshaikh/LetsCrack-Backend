import { Request, Response, NextFunction } from 'express';
/**
 * Submit MCQ answers (Reading/Listening) and auto-grade
 * Body: { testSetNumber, module, answers: [{ questionId, selectedOption }] }
 */
export declare const submitMcqAnswers: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get MCQ task (without correct answers)
 */
export declare const getMcqTask: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
