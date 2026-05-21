import { Request, Response, NextFunction } from 'express';
/**
 * Auto-save writing response every 30 seconds
 * Body: { testSetNumber, taskNumber, responseText, wordCount }
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
/**
 * Get Writing Task prompt
 */
export declare const getTask: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Append simulation integrity timeline events (and bump tab-switch count for selected kinds).
 */
export declare const recordSimulationIntegrity: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Legacy: same as one `visibility_hidden` integrity event (keeps old clients working).
 */
export declare const recordSimulationFocusLoss: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
