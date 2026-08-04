import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Redis from 'ioredis';
import { getOrSetTestSetCache, clearCachedQuestions } from '../utils/cache.js';
import mongoose from 'mongoose';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

await mongoose.connect(process.env.MONGO_URL as string);
await clearCachedQuestions(1);
const cache = await getOrSetTestSetCache(1);
const p2 = cache.listening.find((t: any) => t.taskNumber === 2);
const p3 = cache.listening.find((t: any) => t.taskNumber === 3);
console.log('FROM CACHE after rebuild:');
console.log('P2 audio', p2?.audioUrl);
console.log('P2 Q1', p2?.mcqs?.[0]?.questionAudioUrl);
console.log('P2 Q2', p2?.mcqs?.[1]?.questionAudioUrl);
console.log('P3 audio', p3?.audioUrl);
console.log('P3 Q1', p3?.mcqs?.[0]?.questionAudioUrl);
console.log('P3 Q2', p3?.mcqs?.[1]?.questionAudioUrl);
console.log('P3 Q3', p3?.mcqs?.[2]?.questionAudioUrl);

const r = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
const keys = await r.keys('testset:1:*');
console.log('redis keys', keys);
await r.quit();
await mongoose.disconnect();
process.exit(0);
