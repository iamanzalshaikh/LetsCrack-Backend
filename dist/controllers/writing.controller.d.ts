import { Request, Response, NextFunction } from 'express';
/**
 * Auto-save writing response every 30 seconds
 * Body: { studentId, testSetNumber, taskNumber, responseText, wordCount }
 */
export declare const autoSave: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Restore auto-saved response
 */
export declare const restore: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Final submission of writing response
 */
export declare const submit: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
