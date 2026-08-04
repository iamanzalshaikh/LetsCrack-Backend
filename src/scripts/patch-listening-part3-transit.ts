/**
 * Force-replace Listening Part 3 MCQs (Transit Lost and Found, 3-3-2)
 * and print exact stored options for verification.
 *
 * Usage: npx tsx src/scripts/patch-listening-part3-transit.ts
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import QuestionBank from '../models/QuestionBank.js';
import { clearCachedQuestions } from '../utils/cache.js';
import { LISTENING_PART3_MCQS } from '../seeds/listening/questions/part3.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

await mongoose.connect(process.env.MONGO_URL as string);

// Full document replace of listening fields so stale MCQ arrays cannot linger
const updated = await QuestionBank.findOneAndUpdate(
  { module: 'listening', testSetNumber: 1, taskNumber: 3 },
  {
    $set: {
      title: 'Part 3: Listening for Information',
      instructions:
        'You will hear a conversation between a man and a woman at a transit lost-and-found office. The woman works there and the man has lost something.',
      partInstructionsText:
        'You will hear a conversation in 3 sections. You will hear each section only once.\nAfter each section, you will hear 2 or 3 questions. You will hear the questions only once.\nChoose the best answer to each question.',
      timerSeconds: 480,
      audioUrl: '',
      allowReplay: true,
      allowSeek: true,
      playLimit: 0,
      mcqs: LISTENING_PART3_MCQS,
    },
  },
  { new: true, upsert: false },
);

if (!updated) {
  console.error('Part 3 document not found');
  process.exit(1);
}

// Bust every listening cache key we use
await clearCachedQuestions(1);

const verify = await QuestionBank.findOne({
  module: 'listening',
  testSetNumber: 1,
  taskNumber: 3,
})
  .select('mcqs.questionText mcqs.options mcqs.correctOption mcqs.sectionIntroText')
  .lean();

console.log('Part 3 FORCE-UPDATED: Transit Lost and Found (3-3-2)');
console.log(`Questions: ${(verify?.mcqs || []).length}`);
(verify?.mcqs || []).forEach((m: any, i: number) => {
  console.log(`\nQ${i + 1}. ${m.questionText}`);
  (m.options || []).forEach((o: string, oi: number) => {
    const mark = m.correctOption === oi ? ' ← CORRECT' : '';
    console.log(`  ${String.fromCharCode(65 + oi)}) ${o}${mark}`);
  });
});

await mongoose.disconnect();
process.exit(0);
