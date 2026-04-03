import http from 'http';
import app from './app.js';
import { env } from './config/env.js';
import logger from './utils/logger.js';
import { setupSocket } from './sockets/socket.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const server = http.createServer(app);
// Socket Control
const io = setupSocket(server);
// Initializing Database
async function main() {
    try {
        await prisma.$connect();
        logger.info('Database connected successfully');
        server.listen(env.PORT, () => {
            logger.info(`Server is running at http://localhost:${env.PORT}`);
            logger.info(`API Documentation at http://localhost:${env.PORT}/api-docs`);
            logger.info(`GraphQL Playground at http://localhost:${env.PORT}/graphql`);
        });
    }
    catch (error) {
        logger.error('Critical database connection error:', error);
        process.exit(1);
    }
}
main()
    .catch((e) => {
    logger.error('Unexpected error during startup:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
// Handle graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received: closing HTTP server');
    server.close(() => {
        logger.info('HTTP server closed');
        prisma.$disconnect().then(() => {
            logger.info('Database disconnected');
            process.exit(0);
        });
    });
});
//# sourceMappingURL=server.js.map