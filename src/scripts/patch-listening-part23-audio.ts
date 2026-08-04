/**
 * Patch Listening Set 1 Parts 2–3 audio URLs in Mongo + bust Redis cache.
 * Does not reseed writing/speaking/reading.
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import QuestionBank from '../models/QuestionBank.js';
import { clearCachedQuestions } from '../utils/cache.js';
import { LISTENING_PART2_MCQS } from '../seeds/listening/questions/part2.js';
import { LISTENING_PART3_MCQS } from '../seeds/listening/questions/part3.js';
import { LISTENING_SET1_AUDIO as A } from '../seeds/listening/audioUrlsSet1.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

await mongoose.connect(process.env.MONGO_URL as string);

const part2 = await QuestionBank.findOneAndUpdate(
  { module: 'listening', testSetNumber: 1, taskNumber: 2 },
  {
    $set: {
      audioUrl: A.part2Main,
      mcqs: LISTENING_PART2_MCQS,
    },
  },
  { new: true },
);

const part3 = await QuestionBank.findOneAndUpdate(
  { module: 'listening', testSetNumber: 1, taskNumber: 3 },
  {
    $set: {
      audioUrl: A.part3Main,
      mcqs: LISTENING_PART3_MCQS,
    },
  },
  { new: true },
);

await clearCachedQuestions(1);

console.log('Part 2:', part2 ? 'updated' : 'MISSING', 'audioUrl=', !!part2?.audioUrl);
console.log(
  '  Q audio:',
  (part2?.mcqs || []).map((m: any, i: number) => `Q${i + 1}=${m.questionAudioUrl ? 'SET' : '-'}`).join(' '),
);
console.log('Part 3:', part3 ? 'updated' : 'MISSING', 'audioUrl=', !!part3?.audioUrl);
console.log(
  '  Q audio:',
  (part3?.mcqs || []).map((m: any, i: number) => `Q${i + 1}=${m.questionAudioUrl ? 'SET' : '-'}`).join(' '),
);

await mongoose.disconnect();
process.exit(0);
