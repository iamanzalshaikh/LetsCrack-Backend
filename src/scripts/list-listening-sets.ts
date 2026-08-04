import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import QuestionBank from '../models/QuestionBank.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

await mongoose.connect(process.env.MONGO_URL as string);

const sets = await QuestionBank.distinct('testSetNumber', { module: 'listening' });
console.log('listening testSetNumbers:', sets);

for (const n of sets.sort()) {
  const docs = await QuestionBank.find({ module: 'listening', testSetNumber: n })
    .select('taskNumber title')
    .lean();
  console.log(`\nSet ${n}:`);
  docs
    .sort((a: any, b: any) => a.taskNumber - b.taskNumber)
    .forEach((d: any) => console.log(`  Part ${d.taskNumber}: ${d.title}`));
}

const db = mongoose.connection.db;
if (!db) {
  console.error('Mongo DB handle unavailable after connect');
  process.exit(1);
}
const names = await db.listCollections().toArray();
console.log('\ncollections:', names.map((c) => c.name).join(', '));

await mongoose.disconnect();
