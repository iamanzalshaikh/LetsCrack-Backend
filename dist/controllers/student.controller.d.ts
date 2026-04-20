import { Request, Response, NextFunction } from 'express';
/**
 * Get results for a specific test set
 */
export declare const getResults: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get all test attempts (Progress history)
 */
export declare const getProgress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Start a new test session
 */
export declare const startTest: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get Certificate PDF stream
 */
export declare const getCertificate: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
