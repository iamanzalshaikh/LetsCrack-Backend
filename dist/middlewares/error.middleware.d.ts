import { Request, Response, NextFunction } from 'express';
/** Map mongoose / Mongo errors → HTTP statuses so routes don’t all become opaque 500s. */
export declare const errorHandler: (err: any, req: Request, res: Response, next: NextFunction) => void;
export default errorHandler;
