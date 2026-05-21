import mongoose from 'mongoose';
import TestSet from '../src/models/TestSet.js';
import SpeakingQuestion from '../src/models/SpeakingQuestion.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/LetsEnglish';

async function seed() {
  await mongoose.connect(MONGO_URL);
  console.log('Connected to MongoDB');

  // Compact Task 6 Prompt
  await SpeakingQuestion.findOneAndUpdate(
    { testSetNumber: 1, taskNumber: 6 },
    {
      prompt: "Dealing with a Difficult Situation\n\nYou and Mike work in a department store, and Mike is talking to a customer who wants to return a coffeemaker he bought there. The customer doesn't have his receipt, but you remember selling him the coffeemaker the day before. Mike is refusing to refund the coffeemaker, but the customer is getting upset and just wants his money back.\n\nChoose ONE:\nEITHER\nExplain to Mike that you sold the coffeemaker to the man the day before, and he should give a full refund.\nOR\nExplain to the customer that the store policy is that you must have the original receipt to return an item, so he cannot get a refund for the coffeemaker.",
      // Note: The string above already has single newlines between EITHER/Option and OR/Option.
      // I will make sure there are NO double newlines inside the choice sections.
    },
    { upsert: true }
  );

  console.log('Task 6 prompt compacted');
  await mongoose.disconnect();
}

seed().catch(console.error);
