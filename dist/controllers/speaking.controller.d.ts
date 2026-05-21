import { Request, Response, NextFunction } from "express";
/**
 * Save recorded speaking to Cloudinary and store URL on the session.
 */
export declare const saveRecording: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get task (prompt, image, timings). Task 5 requires ?subTask=A|B (defaults to A).
 */
export declare const getTask: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
