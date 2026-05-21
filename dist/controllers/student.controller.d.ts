import { Request, Response, NextFunction } from 'express';
/**
 * Get results for a specific test set
 * Optional query `sessionId`: when present (e.g. from /results/:setNumber?sessionId=…), load writing/speaking
 * from that attempt. Otherwise defaults to latest TestResult for the set — which often points at a **different**
 * session than the one just finished, so clients should pass sessionId after a test whenever possible.
 */
export declare const getResults: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get all test attempts (Progress history)
 */
export declare const getProgress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get per-session submission and grading status
 */
export declare const getResultStatus: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Start a new test session
 */
export declare const startTest: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Confirm pre-test instructions for a session
 */
export declare const confirmInstructions: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get test instructions by mode for a specific set
 */
export declare const getTestInstructions: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Record media runtime interaction and enforce backend media policy
 */
export declare const recordMediaRuntimeEvent: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get Certificate PDF stream
 */
export declare const getCertificate: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Download full task-wise AI writing report as PDF
 */
export declare const getAiEvaluationReport: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get all available test sets for the library
 */
export declare const getAvailableTests: (req: Request, res: Response, next: NextFunction) => Promise<void>;
