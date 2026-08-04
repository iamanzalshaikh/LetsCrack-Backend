import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

await mongoose.connect(process.env.MONGO_URL as string);
const docs = await mongoose.connection.db!
  .collection('questionbanks')
  .find({ module: 'listening', testSetNumber: 1, taskNumber: { $in: [1, 2, 3] } })
  .project({ taskNumber: 1, audioUrl: 1, 'mcqs.questionAudioUrl': 1, 'mcqs.sectionAudioUrl': 1 })
  .toArray();

for (const d of docs.sort((a, b) => a.taskNumber - b.taskNumber)) {
  console.log(`\nPart ${d.taskNumber} audioUrl: ${d.audioUrl ? 'SET' : 'empty'}`);
  (d.mcqs || []).forEach((m: any, i: number) => {
    console.log(
      `  Q${i + 1} section=${m.sectionAudioUrl ? 'SET' : '-'} question=${m.questionAudioUrl ? 'SET' : '-'}`,
    );
  });
}
await mongoose.disconnect();
