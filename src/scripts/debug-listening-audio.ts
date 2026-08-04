/**
 * Deep-check Listening Set 1 Parts 1–3 audio wiring in Mongo.
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

await mongoose.connect(process.env.MONGO_URL as string);

const docs = await mongoose.connection.db!
  .collection('questionbanks')
  .find({ module: 'listening', testSetNumber: 1, taskNumber: { $in: [1, 2, 3] } })
  .project({ taskNumber: 1, title: 1, audioUrl: 1, mcqs: 1 })
  .toArray();

for (const d of docs.sort((a: any, b: any) => a.taskNumber - b.taskNumber)) {
  console.log(`\n========== PART ${d.taskNumber} ==========`);
  console.log('title:', d.title);
  console.log('audioUrl:', d.audioUrl || '(EMPTY)');
  (d.mcqs || []).forEach((m: any, i: number) => {
    console.log(`Q${i + 1}:`);
    console.log('  text:', (m.questionText || '').slice(0, 60));
    console.log('  sectionAudio:', m.sectionAudioUrl || '-');
    console.log('  questionAudio:', m.questionAudioUrl || '-');
  });
}

// HEAD-check Cloudinary URLs used by part 2/3
const urls = [
  docs.find((d: any) => d.taskNumber === 2)?.audioUrl,
  docs.find((d: any) => d.taskNumber === 2)?.mcqs?.[0]?.questionAudioUrl,
  docs.find((d: any) => d.taskNumber === 2)?.mcqs?.[1]?.questionAudioUrl,
  docs.find((d: any) => d.taskNumber === 3)?.audioUrl,
  docs.find((d: any) => d.taskNumber === 3)?.mcqs?.[0]?.questionAudioUrl,
  docs.find((d: any) => d.taskNumber === 3)?.mcqs?.[1]?.questionAudioUrl,
  docs.find((d: any) => d.taskNumber === 3)?.mcqs?.[2]?.questionAudioUrl,
].filter(Boolean);

console.log('\n========== URL REACHABILITY ==========');
for (const u of urls) {
  try {
    const res = await fetch(u as string, { method: 'HEAD' });
    console.log(res.status, res.headers.get('content-type'), String(u).slice(-50));
  } catch (e: any) {
    console.log('FAIL', e.message, String(u).slice(-50));
  }
}

await mongoose.disconnect();
