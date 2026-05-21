import http from 'http';
import app from './app.js';
import { env } from './config/env.js';
import logger from './utils/logger.js';
import connectDB from './config/database.js';
import { setupSocket } from './sockets/socket.js';
import { setSocketIO } from './sockets/emitter.js';
import { startRetentionPurgeWorker } from './workers/retention.worker.js';
const server = http.createServer(app);
// Initialize Socket.io
const io = setupSocket(server);
setSocketIO(io);
// Start Server
async function startServer() {
    try {
        // Connect to MongoDB
        await connectDB();
        startRetentionPurgeWorker();
        server.listen(env.PORT, () => {
            logger.info(`Server is running in ${env.NODE_ENV} mode on port ${env.PORT}`);
            logger.info(`API Documentation at http://localhost:${env.PORT}/api-docs`);
            logger.info(`GraphQL Playground at http://localhost:${env.PORT}/graphql`);
        });
    }
    catch (error) {
        logger.error('Critical initialization error:', error);
        process.exit(1);
    }
}
startServer();
// Handle graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received: closing HTTP server');
    server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
    });
});
//# sourceMappingURL=server.js.map