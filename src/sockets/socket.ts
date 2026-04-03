import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import logger from '../utils/logger.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const setupSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: [env.CORS_ORIGIN],
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
      const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as any;
      socket.data.user = decoded;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const userId = socket.data.user.id;
    socket.join(`user:${userId}`);
    logger.info(`User connected to socket: ${userId}`);

    socket.on('disconnect', () => {
      logger.info(`User disconnected from socket: ${userId}`);
    });
  });

  return io;
};
