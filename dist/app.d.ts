import { Application } from 'express';
import { ApolloServer, BaseContext } from '@apollo/server';
declare const app: Application;
declare const apolloServer: ApolloServer<BaseContext>;
export default app;
export { apolloServer };
