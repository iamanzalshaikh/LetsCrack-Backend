/**
 * Patch Listening Set 1 Parts 1–3 audio in Mongo + bust Redis.
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import QuestionBank from '../models/QuestionBank.js';
import { clearCachedQuestions } from '../utils/cache.js';
import { LISTENING_PART1_MCQS } from '../seeds/listening/questions/part1.js';
import { LISTENING_PART2_MCQS } from '../seeds/listening/questions/part2.js';
import { LISTENING_PART3_MCQS } from '../seeds/listening/questions/part3.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

await mongoose.connect(process.env.MONGO_URL as string);

await QuestionBank.findOneAndUpdate(
  { module: 'listening', testSetNumber: 1, taskNumber: 1 },
  { $set: { audioUrl: '', mcqs: LISTENING_PART1_MCQS } },
  { new: true },
);

await QuestionBank.findOneAndUpdate(
  { module: 'listening', testSetNumber: 1, taskNumber: 2 },
  { $set: { audioUrl: '', mcqs: LISTENING_PART2_MCQS } },
  { new: true },
);

await QuestionBank.findOneAndUpdate(
  { module: 'listening', testSetNumber: 1, taskNumber: 3 },
  { $set: { audioUrl: '', mcqs: LISTENING_PART3_MCQS } },
  { new: true },
);

await clearCachedQuestions(1);

const docs = await QuestionBank.find({ module: 'listening', testSetNumber: 1, taskNumber: { $in: [1, 2, 3] } })
  .select('taskNumber audioUrl mcqs.sectionAudioUrl mcqs.questionAudioUrl')
  .lean();

for (const d of docs.sort((a: any, b: any) => a.taskNumber - b.taskNumber)) {
  console.log(`Part ${d.taskNumber} audioUrl=${d.audioUrl ? 'SET' : '-'}`);
  (d.mcqs || []).forEach((m: any, i: number) => {
    console.log(
      `  Q${i + 1} section=${m.sectionAudioUrl ? 'SET' : '-'} question=${m.questionAudioUrl ? 'SET' : '-'}`,
    );
  });
}

await mongoose.disconnect();
process.exit(0);
