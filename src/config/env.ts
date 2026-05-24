import { cleanEnv, str, port, url, host, num } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  PORT: port({ default: 5000 }),
  DATABASE_URL: str({ default: '' }),
  MONGO_URL: str(),
  REDIS_HOST: host({ default: 'localhost' }),
  REDIS_PORT: port({ default: 6379 }),
  // JWT
  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str({ default: '' }),
  JWT_ADMIN_ACCESS_SECRET: str({ default: '' }),
  JWT_ADMIN_REFRESH_SECRET: str({ default: '' }),
  JWT_EXPIRE: str({ default: '7d' }),
  // Storage
  CLOUDINARY_CLOUD_NAME: str({ default: '' }),
  CLOUDINARY_API_KEY: str({ default: '' }),
  CLOUDINARY_API_SECRET: str({ default: '' }),
  // URLs
  FRONTEND_URL: url({ default: 'http://localhost:3000' }),
  CORS_ORIGIN: str({ default: 'http://localhost:3000' }),
  // Gemini AI
  GEMINI_API_KEY: str(),
  GEMINI_MODEL: str({ default: 'gemini-flash-latest' }),
});
