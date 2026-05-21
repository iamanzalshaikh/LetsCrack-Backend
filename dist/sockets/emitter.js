import logger from '../utils/logger.js';
let ioRef = null;
export const setSocketIO = (io) => {
    ioRef = io;
};
export const emitToUser = (userId, event, payload) => {
    if (!ioRef) {
        logger.warn(`Socket emit skipped: io not initialized for event ${event}`);
        return;
    }
    ioRef.to(`user:${userId}`).emit(event, payload);
};
export default { setSocketIO, emitToUser };
//# sourceMappingURL=emitter.js.map