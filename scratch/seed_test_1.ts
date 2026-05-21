import mongoose from 'mongoose';
import TestSet from '../src/models/TestSet.js';
import SpeakingQuestion from '../src/models/SpeakingQuestion.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/LetsEnglish';

async function seed() {
  await mongoose.connect(MONGO_URL);
  console.log('Connected to MongoDB');

  // Create or Update Test Set 1
  const testSet = await TestSet.findOneAndUpdate(
    { testSetNumber: 1 },
    {
      title: 'CELPIP Practice Test 1',
      description: 'First practice test for all modules',
      status: 'published',
      modules: ['listening', 'reading', 'writing', 'speaking'],
      modeSupport: ['practice', 'simulation'],
      instructions: {
        practice: 'Standard practice mode instructions.',
        simulation: 'Strict simulation mode instructions.',
        speakingInstructionText: 'Speak clearly into your microphone.',
      }
    },
    { upsert: true, new: true }
  );
  console.log('Test Set 1 Published:', testSet);

  // Add a sample Speaking Task 1
  await SpeakingQuestion.findOneAndUpdate(
    { testSetNumber: 1, taskNumber: 1 },
    {
      module: 'speaking',
      testSetNumber: 1,
      taskNumber: 1,
      prompt: 'Giving Advice\n\nA friend is looking for a new job. Give them some advice on how to prepare for an interview.',
      prepTime: 30,
      speakingTime: 60,
      introInstruction: 'You will have 30 seconds to prepare and 60 seconds to speak.',
    },
    { upsert: true }
  );
  console.log('Speaking Task 1 added');

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch(console.error);
