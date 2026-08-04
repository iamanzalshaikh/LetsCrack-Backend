import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import QuestionBank from '../models/QuestionBank.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

await mongoose.connect(process.env.MONGO_URL as string);

for (let set = 1; set <= 8; set++) {
  const docs = await QuestionBank.find({ module: 'listening', testSetNumber: set })
    .select('taskNumber title audioUrl mcqs')
    .lean();
  console.log(`\n=== Test ${set} ===`);
  if (!docs.length) {
    console.log('  (no listening parts)');
    continue;
  }
  docs
    .sort((a: any, b: any) => a.taskNumber - b.taskNumber)
    .forEach((d: any) => {
      const n = (d.mcqs || []).length;
      const withSec = (d.mcqs || []).filter((m: any) => m.sectionAudioUrl).length;
      const withQ = (d.mcqs || []).filter((m: any) => m.questionAudioUrl).length;
      console.log(
        `  Part ${d.taskNumber}: q=${n} partAudio=${d.audioUrl ? 'Y' : '-'} secAudio=${withSec} qAudio=${withQ} | ${d.title || ''}`,
      );
    });
}

await mongoose.disconnect();
