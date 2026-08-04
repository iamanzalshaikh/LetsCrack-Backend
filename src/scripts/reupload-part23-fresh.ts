/**
 * Force re-upload Part 2/3 conversation + question stems with unique public IDs
 * so CDN/browser caches cannot serve the old assets.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const DOWNLOADS = path.join(process.env.USERPROFILE || '', 'Downloads');
const FOLDER = 'lce-question-media/listening/set1';
const stamp = Date.now();

const FILES: Array<[string, string, string]> = [
  ['part2Main', 'Listening Test-1, Part-2_OpenVox_Conversation_1785254670.wav', `part2-main-${stamp}`],
  ['part3Main', 'Listening Test-1, Part-3_OpenVox_Conversation_1785255714.wav', `part3-main-${stamp}`],
  ['q4', 'question4.wav', `part2-q1-${stamp}`],
  ['q5', 'question5.wav', `part2-q2-${stamp}`],
  ['q6', 'question6.wav', `part3-q1-${stamp}`],
  ['q7', 'question7.wav', `part3-q2-${stamp}`],
  ['q8', 'question8.wav', `part3-q3-${stamp}`],
];

const urls: Record<string, string> = {};

for (const [key, file, pid] of FILES) {
  const abs = path.join(DOWNLOADS, file);
  if (!fs.existsSync(abs)) throw new Error(`Missing ${abs}`);
  console.log(`Uploading ${file} → ${pid}`);
  const result = await cloudinary.uploader.upload(abs, {
    resource_type: 'video',
    folder: FOLDER,
    public_id: pid,
    overwrite: true,
    invalidate: true,
  });
  urls[key] = result.secure_url;
  console.log(`  ${result.secure_url}`);
}

const out = path.resolve(__dirname, '../seeds/listening/audio-urls-part23-fresh.json');
fs.writeFileSync(out, JSON.stringify(urls, null, 2));
console.log('Wrote', out);
console.log(JSON.stringify(urls, null, 2));
