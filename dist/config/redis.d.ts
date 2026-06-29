import { Redis } from 'ioredis';
/** Uses REDIS_URL when set; otherwise REDIS_HOST + REDIS_PORT (default localhost:6379). */
export declare const redis: Redis;
export default redis;
