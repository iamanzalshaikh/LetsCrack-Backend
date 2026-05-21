import mongoose from 'mongoose';
import { env } from './env.js';
import logger from '../utils/logger.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URL);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown MongoDB connection error.';
    logger.error(`MongoDB connection failed: ${message}`);
    if (message.includes('ECONNREFUSED')) {
      logger.error(
        'No MongoDB at this URL (connection refused). Start local MongoDB (port 27017) or point MONGO_URL in .env to MongoDB Atlas / your cluster.',
      );
    }
    process.exit(1);
  }
};

export default connectDB;
