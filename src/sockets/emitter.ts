import { Server } from 'socket.io';
import logger from '../utils/logger.js';

let ioRef: Server | null = null;

export const setSocketIO = (io: Server) => {
  ioRef = io;
};

export const emitToUser = (userId: string, event: string, payload: unknown) => {
  if (!ioRef) {
    logger.warn(`Socket emit skipped: io not initialized for event ${event}`);
    return;
  }

  ioRef.to(`user:${userId}`).emit(event, payload);
};

export default { setSocketIO, emitToUser };
