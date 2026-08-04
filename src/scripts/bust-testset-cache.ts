/**
 * Invalidate Redis test-set cache so Listening audio URLs from Mongo are served.
 * Usage: npx tsx src/scripts/bust-testset-cache.ts [setNumber]
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { clearCachedQuestions } from '../utils/cache.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const setNumber = Number(process.argv[2] || 1);

await mongoose.connect(process.env.MONGO_URL as string);
await clearCachedQuestions(setNumber);
console.log(`Invalidated Redis cache for test set ${setNumber}`);

const doc = await mongoose.connection.db!
  .collection('questionbanks')
  .findOne(
    { module: 'listening', testSetNumber: setNumber, taskNumber: 1 },
    { projection: { audioUrl: 1, 'mcqs.sectionAudioUrl': 1, 'mcqs.questionAudioUrl': 1, title: 1 } },
  );

console.log('Part 1 title:', doc?.title);
console.log('Part 1 Q1 sectionAudioUrl:', doc?.mcqs?.[0]?.sectionAudioUrl ? 'SET' : '(empty)');
console.log('Part 1 Q1 questionAudioUrl:', doc?.mcqs?.[0]?.questionAudioUrl ? 'SET' : '(empty)');
if (doc?.mcqs?.[0]?.sectionAudioUrl) {
  console.log('  →', doc.mcqs[0].sectionAudioUrl);
}

await mongoose.disconnect();
process.exit(0);
