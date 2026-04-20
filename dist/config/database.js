import mongoose from 'mongoose';
import { env } from './env.js';
import logger from '../utils/logger.js';
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.MONGO_URL);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        if (error instanceof Error) {
            logger.error(`Error: ${error.message}`);
        }
        else {
            logger.error('An unknown error occurred during MongoDB connection.');
        }
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=database.js.map