/**
 * Patch Test Set 7 — Listening Part 1 → Animal Shelter (2-3-3).
 * Usage: npx tsx src/scripts/patch-listening-set7-part1-shelter.ts
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import QuestionBank from '../models/QuestionBank.js';
import { clearCachedQuestions } from '../utils/cache.js';
import { LISTENING_SET7_PART1_MCQS } from '../seeds/listening/questions/set7/part1.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

await mongoose.connect(process.env.MONGO_URL as string);

const updated = await QuestionBank.findOneAndUpdate(
  { module: 'listening', testSetNumber: 7, taskNumber: 1 },
  {
    $set: {
      module: 'listening',
      testSetNumber: 7,
      taskNumber: 1,
      title: 'Part 1: Listening to Problem Solving',
      instructions:
        'You will hear a conversation between a woman and a man at an animal shelter. The man works at the shelter and the woman is a visitor.',
      partInstructionsText:
        'You will hear a conversation in 3 sections. You will hear each section only once.\nAfter each section, you will hear 2 or 3 questions. You will hear the questions only once.\nChoose the best answer to each question.',
      timerSeconds: 480,
      audioUrl: '',
      allowReplay: true,
      allowSeek: true,
      playLimit: 0,
      mcqs: LISTENING_SET7_PART1_MCQS,
    },
  },
  { new: true, upsert: true },
);

await clearCachedQuestions(7);

console.log('Test 7 Part 1 updated: Animal Shelter (2-3-3)');
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
