import { cleanEnv, str, port, url, host } from 'envalid';
import dotenv from 'dotenv';
dotenv.config();
export const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
    PORT: port({ default: 5000 }),
    DATABASE_URL: str(),
    REDIS_HOST: host({ default: 'localhost' }),
    REDIS_PORT: port({ default: 6379 }),
    JWT_SECRET: str(),
    JWT_EXPIRE: str({ default: '7d' }),
    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),
    AWS_ACCESS_KEY_ID: str(),
    AWS_SECRET_ACCESS_KEY: str(),
    AWS_REGION: str({ default: 'us-east-1' }),
    AWS_S3_BUCKET_NAME: str(),
    FRONTEND_URL: url({ default: 'http://localhost:3000' }),
});
//# sourceMappingURL=env.js.map