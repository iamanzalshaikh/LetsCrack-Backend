/**
 * Patch Listening Part 2 → University Campus (Set 2, distribution 3-2-3).
 * Usage: npx tsx src/scripts/patch-listening-part2-campus.ts
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import QuestionBank from '../models/QuestionBank.js';
import { clearCachedQuestions } from '../utils/cache.js';
import { LISTENING_PART2_MCQS } from '../seeds/listening/questions/part2.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

await mongoose.connect(process.env.MONGO_URL as string);

const updated = await QuestionBank.findOneAndUpdate(
  { module: 'listening', testSetNumber: 1, taskNumber: 2 },
  {
    $set: {
      title: 'Part 2: Listening to a Daily Life Conversation',
      instructions:
        'You will hear a conversation between a woman and a man on a university campus. The woman is a student and the man works at the information desk.',
      partInstructionsText:
        'You will hear a conversation in 3 sections. You will hear each section only once.\nAfter each section, you will hear 2 or 3 questions. You will hear the questions only once.\nChoose the best answer to each question.',
      timerSeconds: 480,
      audioUrl: '',
      allowReplay: true,
      allowSeek: true,
      playLimit: 0,
      mcqs: LISTENING_PART2_MCQS,
    },
  },
  { new: true },
);

if (!updated) {
  console.error('Part 2 document not found');
  process.exit(1);
}

await clearCachedQuestions(1);

console.log('Part 2 updated: University Campus (3-2-3)');
console.log(`Questions: ${(updated.mcqs || []).length}`);
(updated.mcqs || []).forEach((m: any, i: number) => {
  console.log(
    `  Q${i + 1} section=${m.sectionScript ? 'script' : '-'} text=${(m.questionText || '').slice(0, 50)}`,
  );
});

await mongoose.disconnect();
process.exit(0);
