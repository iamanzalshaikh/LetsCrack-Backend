import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { env } from './config/env.js';
import { swaggerSpec } from './docs/swagger.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { apiLimiter } from './middlewares/rateLimit.middleware.js';
import routes from './routes/index.js';
const app = express();
// Middlewares
app.use(helmet());
app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true,
}));
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Rate Limiter
app.use('/api', apiLimiter);
// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// API Routes
app.use('/api/v1', routes);
// Apollo Server (GraphQL) Placeholder
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;
const resolvers = {
    Query: {
        hello: () => 'Hello from Letscrackweb GraphQL!',
    },
};
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});
await apolloServer.start();
app.use('/graphql', expressMiddleware(apolloServer));
// Root Endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Letscrackweb API is running' });
});
// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});
// Error Handler
app.use(errorHandler);
export default app;
export { apolloServer };
//# sourceMappingURL=app.js.map