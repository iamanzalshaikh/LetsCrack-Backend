import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import QuestionBank from '../models/QuestionBank.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

await mongoose.connect(process.env.MONGO_URL as string);

const d = await QuestionBank.findOne({
  module: 'listening',
  testSetNumber: 2,
  taskNumber: 1,
}).lean();

if (!d) {
  console.log('FAIL: Test 2 Part 1 not found in Mongo');
  process.exit(1);
}

const expected = [
  {
    q: 'What is this conversation about?',
    opts: ['choosing a film', 'a refund request', 'a missing reservation', 'a membership plan'],
    correct: 2,
    section: true,
  },
  {
    q: 'What is likely true about the theatre today?',
    opts: [
      'It is closing early.',
      'It is understaffed permanently.',
      'It has raised its prices.',
      'It is unusually busy.',
    ],
    correct: 3,
    section: false,
  },
  {
    q: 'What problem does the man expect to have?',
    opts: [
      'He may be unable to find his sister.',
      'He may lose the money he paid.',
      'He may not get in before the film begins.',
      'He may have to park elsewhere.',
    ],
    correct: 2,
    section: false,
  },
  {
    q: 'What does the woman believe caused the problem?',
    opts: [
      'He selected the wrong screening time.',
      'The payment was declined.',
      'His email address was entered incorrectly.',
      'The site kept a location he had used before.',
    ],
    correct: 3,
    section: true,
  },
  {
    q: 'What is likely true about this kind of error?',
    opts: [
      'It has never happened before.',
      'It affects customers regularly.',
      'It only occurs on holidays.',
      'It is caused by customer carelessness.',
    ],
    correct: 1,
    section: false,
  },
  {
    q: 'What does the woman give the man for the inconvenience?',
    opts: [
      'credit toward a later visit',
      'free refreshments',
      'a cash refund',
      'a membership card',
    ],
    correct: 0,
    section: true,
  },
  {
    q: 'What does the woman recommend?',
    opts: [
      'printing every confirmation',
      'registering instead of buying as a guest',
      'booking over the telephone',
      'arriving much earlier',
    ],
    correct: 1,
    section: false,
  },
  {
    q: 'What is likely true about the man?',
    opts: [
      'He expects to book there again.',
      'He rarely visits the cinema.',
      'He distrusts online payment.',
      'He will ask for his money back.',
    ],
    correct: 0,
    section: false,
  },
];

const mcqs = d.mcqs || [];
let fails = 0;

console.log('=== Test Set 2 / Listening Part 1 ===');
console.log('title:', d.title);
console.log('instructions:', d.instructions);
console.log('part audioUrl:', d.audioUrl ? 'SET' : 'empty (OK — use section audio)');
console.log('question count:', mcqs.length, mcqs.length === 8 ? 'OK' : 'WRONG');

mcqs.forEach((m: any, i: number) => {
  const e = expected[i];
  const hasSection = !!(m.sectionScript || m.sectionIntroText || m.sectionAudioUrl);
  const optMatch = JSON.stringify(m.options || []) === JSON.stringify(e?.opts || []);
  const qMatch = m.questionText === e?.q;
  const cMatch = m.correctOption === e?.correct;
  const sMatch = hasSection === e?.section;
  const ok = qMatch && optMatch && cMatch && sMatch;
  if (!ok) fails += 1;
  console.log(`\nQ${i + 1} ${ok ? 'OK' : 'MISMATCH'}`);
  console.log('  text:', m.questionText);
  console.log('  options:', (m.options || []).join(' | '));
  console.log('  correct:', m.correctOption, '→', (m.options || [])[m.correctOption]);
  console.log(
    '  sectionStart:',
    hasSection,
    '| sectionAudio:',
    m.sectionAudioUrl ? 'UPLOADED' : 'not yet',
    '| questionAudio:',
    m.questionAudioUrl ? 'UPLOADED' : 'not yet',
  );
  if (!ok && e) {
    if (!qMatch) console.log('  expected text:', e.q);
    if (!optMatch) console.log('  expected opts:', e.opts.join(' | '));
    if (!cMatch) console.log('  expected correct:', e.correct);
    if (!sMatch) console.log('  expected sectionStart:', e.section);
  }
});

console.log('\n=== RESULT ===');
if (fails === 0 && mcqs.length === 8) {
  console.log('YES — Movie Theatre questions are uploaded correctly in Mongo.');
  console.log('NOTE: Section/question WAV files are still empty — upload those in admin.');
} else {
  console.log(`NO — ${fails} question(s) do not match Movie Theatre content.`);
  process.exitCode = 1;
}

await mongoose.disconnect();
