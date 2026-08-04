/**
 * Patch Test Set 4 — Listening Part 1 → Transit Lost and Found (3-3-2).
 * Usage: npx tsx src/scripts/patch-listening-set4-part1-transit.ts
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import QuestionBank from '../models/QuestionBank.js';
import { clearCachedQuestions } from '../utils/cache.js';
import { LISTENING_SET4_PART1_MCQS } from '../seeds/listening/questions/set4/part1.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

await mongoose.connect(process.env.MONGO_URL as string);

const updated = await QuestionBank.findOneAndUpdate(
  { module: 'listening', testSetNumber: 4, taskNumber: 1 },
  {
    $set: {
      module: 'listening',
      testSetNumber: 4,
      taskNumber: 1,
      title: 'Part 1: Listening to Problem Solving',
      instructions:
        'You will hear a conversation between a man and a woman at a transit lost-and-found office. The woman works there and the man has lost something.',
      partInstructionsText:
        'You will hear a conversation in 3 sections. You will hear each section only once.\nAfter each section, you will hear 2 or 3 questions. You will hear the questions only once.\nChoose the best answer to each question.',
      timerSeconds: 480,
      audioUrl: '',
      allowReplay: true,
      allowSeek: true,
      playLimit: 0,
      mcqs: LISTENING_SET4_PART1_MCQS,
    },
  },
  { new: true, upsert: true },
);

await clearCachedQuestions(4);

console.log('Test 4 Part 1 updated: Transit Lost and Found (3-3-2)');
console.log(`Questions: ${(updated?.mcqs || []).length}`);
(updated?.mcqs || []).forEach((m: any, i: number) => {
  console.log(`\nQ${i + 1}. ${m.questionText}`);
  (m.options || []).forEach((o: string, oi: number) => {
    const mark = m.correctOption === oi ? ' ← CORRECT' : '';
    console.log(`  ${String.fromCharCode(65 + oi)}) ${o}${mark}`);
  });
});

await mongoose.disconnect();
process.exit(0);
