import { Server } from 'socket.io';
import logger from '../utils/logger.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
/** Must match Express `app.ts` — Engine.IO polling bypasses the Express `cors()` middleware. */
function socketAllowedOrigins() {
    return Array.from(new Set([
        'http://localhost:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
        env.CORS_ORIGIN,
        env.FRONTEND_URL,
    ].filter((o) => typeof o === 'string' && o.length > 0)));
}
export const setupSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: socketAllowedOrigins(),
            methods: ['GET', 'POST'],
            credentials: true,
        },
        transports: ['websocket', 'polling'],
    });
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }
        try {
            const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
            socket.data.user = decoded;
            next();
        }
        catch (err) {
            next(new Error('Authentication error'));
        }
    });
    io.on('connection', (socket) => {
        const userId = socket.data.user.id;
        socket.join(`user:${userId}`);
        logger.info(`User connected to socket: ${userId}`);
        socket.on('disconnect', () => {
            logger.info(`User disconnected from socket: ${userId}`);
        });
    });
    return io;
};
//# sourceMappingURL=socket.js.map