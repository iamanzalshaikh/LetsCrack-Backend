import { Redis, type RedisOptions } from 'ioredis';
import { env } from './env.js';
import logger from '../utils/logger.js';

const redisUrl = (env.REDIS_URL || '').trim();

const redisOptions: RedisOptions = {
  maxRetriesPerRequest: null,
  ...(redisUrl
    ? {}
    : {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
      }),
};

/** Uses REDIS_URL when set; otherwise REDIS_HOST + REDIS_PORT (default localhost:6379). */
export const redis = redisUrl ? new Redis(redisUrl, redisOptions) : new Redis(redisOptions);

if (!redisUrl && env.NODE_ENV === 'production') {
  logger.warn(
    'REDIS_URL is not set in production — falling back to REDIS_HOST/REDIS_PORT (often localhost). Add a managed Redis URL on Render.',
  );
}

redis.on('connect', () => {
  logger.info('Connected to Redis');
});

redis.on('error', (err) => {
  logger.error('Redis connection error:', err);
});

export default redis;

