/**
 * Upload Listening Test Set 1 audio from Downloads → Cloudinary,
 * then print URL map for seed wiring.
 *
 * Mapping (final):
 *   Part 1: main + question1–3
 *   Part 2: conversation + question4–5
 *   Part 3: conversation + question6–8
 *
 * Usage: npx tsx src/scripts/upload-listening-set1-audio.ts
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

const DOWNLOADS = path.join(process.env.USERPROFILE || process.env.HOME || '', 'Downloads');
const OUT_JSON = path.resolve(__dirname, '../seeds/listening/audio-urls-set1.json');
const FOLDER = 'lce-question-media/listening/set1';

type Item = { key: string; file: string; publicId: string };

const FILES: Item[] = [
  {
    key: 'part1Main',
    file: 'Listening Test-1, Part-1_Main Audio.wav',
    publicId: `${FOLDER}/part1-main`,
  },
  { key: 'q1', file: 'question1.wav', publicId: `${FOLDER}/part1-q1` },
  { key: 'q2', file: 'question2.wav', publicId: `${FOLDER}/part1-q2` },
  { key: 'q3', file: 'question3.wav', publicId: `${FOLDER}/part1-q3` },
  {
    key: 'part2Main',
    file: 'Listening Test-1, Part-2_OpenVox_Conversation_1785254670.wav',
    publicId: `${FOLDER}/part2-main`,
  },
  { key: 'q4', file: 'question4.wav', publicId: `${FOLDER}/part2-q1` },
  { key: 'q5', file: 'question5.wav', publicId: `${FOLDER}/part2-q2` },
  {
    key: 'part3Main',
    file: 'Listening Test-1, Part-3_OpenVox_Conversation_1785255714.wav',
    publicId: `${FOLDER}/part3-main`,
  },
  { key: 'q6', file: 'question6.wav', publicId: `${FOLDER}/part3-q1` },
  { key: 'q7', file: 'question7.wav', publicId: `${FOLDER}/part3-q2` },
  { key: 'q8', file: 'question8.wav', publicId: `${FOLDER}/part3-q3` },
];

async function uploadOne(item: Item): Promise<[string, string]> {
  const abs = path.join(DOWNLOADS, item.file);
  if (!fs.existsSync(abs)) {
    throw new Error(`Missing file: ${abs}`);
  }
  const bytes = fs.statSync(abs).size;
  console.log(`Uploading ${item.file} (${bytes} bytes) → ${item.publicId} ...`);
  const result = await cloudinary.uploader.upload(abs, {
    resource_type: 'video', // wav/audio
    folder: FOLDER,
    public_id: item.publicId.split('/').pop(),
    overwrite: true,
    invalidate: true,
    use_filename: false,
    unique_filename: false,
  });
  console.log(`  → ${result.secure_url}`);
  return [item.key, result.secure_url];
}

async function main() {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('CLOUDINARY_CLOUD_NAME missing in .env');
  }

  const urls: Record<string, string> = {};
  for (const item of FILES) {
    const [key, url] = await uploadOne(item);
    urls[key] = url;
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify(urls, null, 2), 'utf8');
  console.log(`\nWrote ${OUT_JSON}`);
  console.log(JSON.stringify(urls, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
