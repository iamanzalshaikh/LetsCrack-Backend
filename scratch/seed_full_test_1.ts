import mongoose from 'mongoose';
import TestSet from '../src/models/TestSet.js';
import SpeakingQuestion from '../src/models/SpeakingQuestion.js';
import WritingQuestion from '../src/models/WritingQuestion.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/LetsEnglish';

async function seed() {
  await mongoose.connect(MONGO_URL);
  console.log('Connected to MongoDB');

  // 1. Ensure Test Set 1 exists and is published
  await TestSet.findOneAndUpdate(
    { testSetNumber: 1 },
    {
      title: 'CELPIP Practice Test 1',
      description: 'Comprehensive CELPIP practice test including all 8 speaking tasks.',
      status: 'published',
      modules: ['listening', 'reading', 'writing', 'speaking'],
      modeSupport: ['practice', 'simulation'],
      instructions: {
        practice: 'Standard practice mode. You can see sample responses and retry tasks.',
        simulation: 'Strict simulation mode. No sample responses, tab switching is logged.',
        writingInstructionText: 'Type your response in the text area provided.',
        speakingInstructionText: 'Speak clearly into your microphone after the preparation time ends.',
      }
    },
    { upsert: true }
  );

  // 2. Clear existing questions for Test Set 1 to avoid duplicates/confusion
  await SpeakingQuestion.deleteMany({ testSetNumber: 1 });
  await WritingQuestion.deleteMany({ testSetNumber: 1 });

  const speakingTasks = [
    {
      taskNumber: 1,
      prompt: 'Giving Advice\n\nA friend is planning to buy their first car but is confused between buying a new one or a used one. Give them some advice on what factors they should consider and what you would recommend.',
      prepTime: 30,
      speakingTime: 90,
      introInstruction: 'Task 1: Giving Advice. You will have 30 seconds to prepare and 90 seconds to speak.',
    },
    {
      taskNumber: 2,
      prompt: 'Talking about a Personal Experience\n\nTell a story about a time you visited a place that was very different from where you live. Describe what the place was like and how the experience made you feel.',
      prepTime: 30,
      speakingTime: 60,
      introInstruction: 'Task 2: Talking about a Personal Experience. You will have 30 seconds to prepare and 60 seconds to speak.',
    },
    {
      taskNumber: 3,
      prompt: 'Describing a Scene\n\nDescribe what is happening in the picture. Provide as many details as possible so that someone who cannot see the picture can understand what is going on.',
      prepTime: 30,
      speakingTime: 60,
      imageUrl: 'https://res.cloudinary.com/dn8rrk9jq/image/upload/v1715843400/lce-samples/speaking_task3_sample.jpg',
      introInstruction: 'Task 3: Describing a Scene. You will have 30 seconds to prepare and 60 seconds to speak.',
    },
    {
      taskNumber: 4,
      prompt: 'Making Predictions\n\nLook at the same picture again. What do you think will happen next? Use your imagination and describe the likely next steps for the people in the scene.',
      prepTime: 30,
      speakingTime: 60,
      imageUrl: 'https://res.cloudinary.com/dn8rrk9jq/image/upload/v1715843400/lce-samples/speaking_task3_sample.jpg',
      introInstruction: 'Task 4: Making Predictions. You will have 30 seconds to prepare and 60 seconds to speak.',
    },
    {
      taskNumber: 5,
      subTask: 'A',
      prompt: 'Comparing and Persuading\n\nYou are planning a weekend getaway with your family. Choose one of the two options below that you think is better for a group of 5 people.',
      prepTime: 60,
      speakingTime: 0, // Selection phase has no speaking time in the player logic
      optionALabel: 'Mountain Cabin\n- $200 per night\n- Beautiful views\n- No WiFi',
      imageUrlA: 'https://res.cloudinary.com/dn8rrk9jq/image/upload/v1715843400/lce-samples/cabin.jpg',
      optionBLabel: 'Beach Resort\n- $350 per night\n- All-inclusive meals\n- High-speed WiFi',
      imageUrlB: 'https://res.cloudinary.com/dn8rrk9jq/image/upload/v1715843400/lce-samples/beach.jpg',
      imageUrlC: 'https://res.cloudinary.com/dn8rrk9jq/image/upload/v1715843400/lce-samples/city_hotel.jpg',
      optionCLabel: 'City Hotel\n- $150 per night\n- Near museums\n- Small rooms',
      introInstruction: 'Task 5: Comparing and Persuading. Part 1: Choose an option.',
    },
    {
      taskNumber: 5,
      subTask: 'B',
      prompt: 'Comparing and Persuading\n\nNow, your sister has chosen a different option (the City Hotel). Persuade her that your choice is better by comparing the two options.',
      prepTime: 60,
      speakingTime: 60,
      introInstruction: 'Task 5: Comparing and Persuading. Part 2: Persuade your family member.',
    },
    {
      taskNumber: 6,
      prompt: 'Dealing with a Difficult Situation\n\nYou promised your boss you would finish a report by Friday, but your computer crashed and you lost all your work. Call your boss to explain the situation and suggest a solution.',
      prepTime: 60,
      speakingTime: 60,
      introInstruction: 'Task 6: Dealing with a Difficult Situation. You will have 60 seconds to prepare and 60 seconds to speak.',
    },
    {
      taskNumber: 7,
      prompt: 'Expressing Opinions\n\nDo you think that children should be allowed to use smartphones in school? Explain your opinion with reasons and examples.',
      prepTime: 30,
      speakingTime: 90,
      introInstruction: 'Task 7: Expressing Opinions. You will have 30 seconds to prepare and 90 seconds to speak.',
    },
    {
      taskNumber: 8,
      prompt: 'Describing an Unusual Situation\n\nYou are at a furniture store and see a very strange-looking chair. Call your spouse and describe the chair in detail so they can decide if they want to buy it.',
      prepTime: 30,
      speakingTime: 60,
      imageUrl: 'https://res.cloudinary.com/dn8rrk9jq/image/upload/v1715843400/lce-samples/unusual_chair.jpg',
      introInstruction: 'Task 8: Describing an Unusual Situation. You will have 30 seconds to prepare and 60 seconds to speak.',
    }
  ];

  for (const t of speakingTasks) {
    await SpeakingQuestion.create({
      ...t,
      module: 'speaking',
      testSetNumber: 1,
      updatedAt: new Date(),
    });
  }
  console.log('All 8 Speaking Tasks seeded for Test Set 1');

  // Also add some Writing tasks so the test is complete
  await WritingQuestion.create([
    {
      testSetNumber: 1,
      taskNumber: 1,
      module: 'writing',
      title: 'Writing an Email',
      prompt: 'You recently stayed at a hotel and were unhappy with the service. Write an email to the manager explaining the problems and what you would like them to do.',
      timeLimit: 27,
      wordCountMin: 150,
      wordCountMax: 200,
    },
    {
      testSetNumber: 1,
      taskNumber: 2,
      module: 'writing',
      title: 'Responding to Survey Questions',
      prompt: 'Your city is considering building a new park or a new shopping mall. Which one do you think is better for the community? Explain your choice.',
      timeLimit: 26,
      wordCountMin: 150,
      wordCountMax: 200,
    }
  ]);
  console.log('Writing tasks seeded');

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch(console.error);
