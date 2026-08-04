import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import QuestionBank from '../models/QuestionBank.js';
import ScoreMapping from '../models/ScoreMapping.js';
import SpeakingQuestion from '../models/SpeakingQuestion.js';
import TestSet from '../models/TestSet.js';
import WritingQuestion from '../models/WritingQuestion.js';
import logger from '../utils/logger.js';
import { clearCachedQuestions } from '../utils/cache.js';
import { SPEAKING_TASK1_PROMPTS } from './speaking/questions/task1.js';
import { SPEAKING_TASK2_PROMPTS } from './speaking/questions/task2.js';
import {
  SPEAKING_SCENE_LABELS,
  buildTask3Prompt,
  buildTask4Prompt,
  getSpeakingSceneImagePath,
} from './speaking/questions/scenes.js';
import {
  SPEAKING_TASK5_SETS,
  buildTask5APrompt,
  buildTask5BPrompt,
  getTask5Labels,
  getTask5OptionImages,
} from './speaking/questions/task5.js';
import { SPEAKING_TASK6_PROMPTS } from './speaking/questions/task6.js';
import { SPEAKING_TASK7_PROMPTS } from './speaking/questions/task7.js';
import { buildTask8Prompt, getSpeakingTask8ImagePath } from './speaking/questions/task8.js';
import { LISTENING_PART1_MCQS } from './listening/questions/part1.js';
import { LISTENING_PART2_MCQS } from './listening/questions/part2.js';
import { LISTENING_PART3_MCQS } from './listening/questions/part3.js';
import { LISTENING_PART4_DROPDOWN_QUESTIONS } from './listening/questions/part4.js';
import { LISTENING_PART5_MCQS } from './listening/questions/part5.js';
import { LISTENING_PART6_MCQS } from './listening/questions/part6.js';
import { LISTENING_TEST_INSTRUCTIONS } from './listening/instructions.js';
import { READING_TEST_INSTRUCTIONS } from './reading/instructions.js';
import { READING_PART1 } from './reading/part1.js';
import { READING_PART2 } from './reading/part2.js';
import { READING_PART3 } from './reading/part3.js';
import { READING_PART4 } from './reading/part4.js';
import { WRITING_TASK1_QUESTIONS } from './writing/questions/task1.js';
import { WRITING_TASK2_QUESTIONS } from './writing/questions/task2.js';

const seedWritingData = async () => {
  try {
    logger.info('Seeding Writing Tasks 1-2 for Test Sets 1-25...');
    await WritingQuestion.deleteMany({ module: 'writing' });

    for (let setNum = 1; setNum <= 25; setNum++) {
      const task1 = WRITING_TASK1_QUESTIONS[setNum - 1];
      const task2 = WRITING_TASK2_QUESTIONS[setNum - 1];
      if (!task1 || !task2) {
        logger.warn(`Missing writing prompt for test set ${setNum}; skipping.`);
        continue;
      }

      await WritingQuestion.findOneAndUpdate(
        { testSetNumber: setNum, taskNumber: 1 },
        {
          module: 'writing',
          testSetNumber: setNum,
          taskNumber: 1,
          timeLimit: 1620,
          scenario: {
            subheading: task1.subheading,
            backgroundParagraph: task1.backgroundParagraph,
            taskInstructions: task1.taskInstructions,
          },
          wordCountTarget: '150-200',
        },
        { upsert: true },
      );

      await WritingQuestion.findOneAndUpdate(
        { testSetNumber: setNum, taskNumber: 2 },
        {
          module: 'writing',
          testSetNumber: setNum,
          taskNumber: 2,
          timeLimit: 1560,
          scenario: {
            subheading: task2.title,
            backgroundParagraph: task2.backgroundParagraph,
          },
          surveyTopic: task2.surveyTopic,
          optionA: task2.optionA,
          optionB: task2.optionB,
          wordCountTarget: '150-200',
        },
        { upsert: true },
      );
    }

    for (let setNum = 1; setNum <= 25; setNum++) {
      await clearCachedQuestions(setNum);
    }

    logger.info('Writing Tasks 1-2 seeded for Test Sets 1-25 successfully!');
  } catch (error) {
    logger.error('Error seeding writing database data:', error);
  }
};

const seedReadingData = async () => {
  try {
    logger.info('Clearing old Reading Set #1 question bank and mapping documents...');
    await QuestionBank.deleteMany({ module: 'reading', testSetNumber: 1 });
    await ScoreMapping.deleteMany({ module: 'reading', testSetNumber: 1 });

    await TestSet.findOneAndUpdate(
      { testSetNumber: 1 },
      {
        $set: {
          'instructions.readingInstructionText': READING_TEST_INSTRUCTIONS,
        },
      },
      { upsert: false }
    );

    logger.info('Inserting Score Mappings for CELPIP Reading...');
    const readingScoreMapping = new ScoreMapping({
      module: 'reading',
      testSetNumber: 1,
      mappings: [
        { minScore: 33, maxScore: 38, band: '10-12' },
        { minScore: 31, maxScore: 32, band: '9' },
        { minScore: 28, maxScore: 30, band: '7-8' },
        { minScore: 20, maxScore: 27, band: '5-6' },
        { minScore: 8,  maxScore: 19, band: '3-4' },
        { minScore: 0,  maxScore: 7,  band: 'M' }
      ]
    });
    await readingScoreMapping.save();

    const readingParts = [
      { taskNumber: 1, data: READING_PART1 },
      { taskNumber: 2, data: READING_PART2 },
      { taskNumber: 3, data: READING_PART3 },
      { taskNumber: 4, data: READING_PART4 },
    ];

    for (const part of readingParts) {
      logger.info(`Seeding Reading Part ${part.taskNumber}...`);
      const doc = new QuestionBank({
        module: 'reading',
        testSetNumber: 1,
        taskNumber: part.taskNumber,
        title: part.data.title,
        instructions: part.data.instructions,
        timerSeconds: part.data.timerSeconds,
        layoutType: part.data.layoutType,
        leftPanel: part.data.leftPanel,
        rightPanel: part.data.rightPanel,
        metadata: {
          difficulty: part.taskNumber <= 2 ? 'medium' : 'hard',
          tags: ['celpip', 'reading', `part-${part.taskNumber}`],
          source: 'celpip-general-practice-1',
          estimatedTime: part.data.timerSeconds,
        },
      });
      await doc.save();
    }

    logger.info('Reading Test Set #1 data and score mappings seeded successfully!');
  } catch (error) {
    logger.error('Error seeding reading database data:', error);
  }
};

const seedListeningData = async () => {
  try {
    // 1. Clear previous listening tasks and score mappings for Test Set #1
    logger.info('Clearing old Listening Set #1 question bank and mapping documents...');
    await QuestionBank.deleteMany({ module: 'listening', testSetNumber: 1 });
    await ScoreMapping.deleteMany({ module: 'listening', testSetNumber: 1 });

    await TestSet.updateMany(
      { testSetNumber: { $gte: 1, $lte: 25 } },
      {
        $set: {
          'instructions.listeningInstructionText': LISTENING_TEST_INSTRUCTIONS,
        },
      }
    );

    // 2. Insert Score Mapping configs
    logger.info('Inserting Score Mappings for CELPIP Listening...');
    const listeningScoreMapping = new ScoreMapping({
      module: 'listening',
      testSetNumber: 1,
      mappings: [
        { minScore: 33, maxScore: 38, band: '10-12' },
        { minScore: 31, maxScore: 32, band: '9' },
        { minScore: 28, maxScore: 30, band: '7-8' },
        { minScore: 20, maxScore: 27, band: '5-6' },
        { minScore: 8,  maxScore: 19, band: '3-4' },
        { minScore: 0,  maxScore: 7,  band: 'M' }
      ]
    });
    await listeningScoreMapping.save();

    // Part 1: Listening to Problem Solving
    logger.info('Seeding Listening Part 1...');
    const part1 = new QuestionBank({
      module: 'listening',
      testSetNumber: 1,
      taskNumber: 1,
      title: 'Part 1: Listening to Problem Solving',
      instructions: 'You will hear a conversation between a man and a woman in a health club. The man is checking his account, and the woman is working at the front desk. Listen to the conversation and answer the 8 questions.',
      partInstructionsText: "You will hear a conversation in 3 sections. You will hear each section only once.\nAfter each section, you will hear 2 or 3 questions. You will hear the questions only once.\nChoose the best answer to each question.",
      timerSeconds: 480,
      audioUrl: '',
      allowReplay: true,
      allowSeek: true,
      playLimit: 0,
      mcqs: LISTENING_PART1_MCQS
    });
    await part1.save();

    // Part 2: Listening to a Daily Life Conversation (University Campus, 3-2-3)
    logger.info('Seeding Listening Part 2...');
    const part2 = new QuestionBank({
      module: 'listening',
      testSetNumber: 1,
      taskNumber: 2,
      title: 'Part 2: Listening to a Daily Life Conversation',
      instructions:
        'You will hear a conversation between a woman and a man on a university campus. The woman is a student and the man works at the information desk.',
      partInstructionsText:
        'You will hear a conversation in 3 sections. You will hear each section only once.\nAfter each section, you will hear 2 or 3 questions. You will hear the questions only once.\nChoose the best answer to each question.',
      timerSeconds: 480,
      audioUrl: '',
      allowReplay: true,
      allowSeek: true,
      playLimit: 0,
      mcqs: LISTENING_PART2_MCQS
    });
    await part2.save();

    // Part 3: Listening for Information (Transit Lost and Found, 3-3-2)
    logger.info('Seeding Listening Part 3...');
    const part3 = new QuestionBank({
      module: 'listening',
      testSetNumber: 1,
      taskNumber: 3,
      title: 'Part 3: Listening for Information',
      instructions:
        'You will hear a conversation between a man and a woman at a transit lost-and-found office. The woman works there and the man has lost something.',
      partInstructionsText:
        'You will hear a conversation in 3 sections. You will hear each section only once.\nAfter each section, you will hear 2 or 3 questions. You will hear the questions only once.\nChoose the best answer to each question.',
      timerSeconds: 480,
      audioUrl: '',
      allowReplay: true,
      allowSeek: true,
      playLimit: 0,
      mcqs: LISTENING_PART3_MCQS
    });
    await part3.save();

    // Part 4: Listening to a News Item
    logger.info('Seeding Listening Part 4...');
    const part4 = new QuestionBank({
      module: 'listening',
      testSetNumber: 1,
      taskNumber: 4,
      title: 'Part 4: Listening to a News Item',
      instructions: 'You will hear a news item. Listen and complete the statements.',
      partInstructionsText: "You will hear a news item followed by 5 questions.\nListen to each question. You will hear the questions only once.\nChoose the best answer to each question from the drop-down menu.",
      timerSeconds: 180,
      layoutType: 'single',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      allowReplay: true,
      allowSeek: true,
      playLimit: 0,
      passageText: 'This is a sample news report about road safety and community traffic initiatives across British Columbia.',
      mcqs: [],
      rightPanel: {
        sections: [{
          type: 'standalone_dropdown',
          questions: LISTENING_PART4_DROPDOWN_QUESTIONS
        }]
      }
    });
    await part4.save();

    // Part 5: Listening to a Discussion
    logger.info('Seeding Listening Part 5...');
    const part5 = new QuestionBank({
      module: 'listening',
      testSetNumber: 1,
      taskNumber: 5,
      title: 'Part 5: Listening to a Discussion',
      instructions: 'You will hear a discussion among three coworkers planning an office party. Listen and answer the 8 questions.',
      partInstructionsText: "You will watch a discussion followed by 8 questions.\nListen to each question. You will hear the questions only once.\nChoose the best answer to each question from the drop-down menu.",
      timerSeconds: 480,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      allowReplay: true,
      allowSeek: true,
      playLimit: 0,
      mcqs: LISTENING_PART5_MCQS
    });
    await part5.save();

    // Part 6: Listening for Viewpoints
    logger.info('Seeding Listening Part 6...');
    const part6 = new QuestionBank({
      module: 'listening',
      testSetNumber: 1,
      taskNumber: 6,
      title: 'Part 6: Listening for Viewpoints',
      instructions: 'You will hear a commentary presenting different views on remote work. Listen and answer the 6 questions.',
      partInstructionsText: "You will hear a report followed by 6 questions.\nListen to each question. You will hear the questions only once.\nChoose the best answer to each question from the drop-down menu.",
      timerSeconds: 360,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      allowReplay: true,
      allowSeek: true,
      playLimit: 0,
      mcqs: LISTENING_PART6_MCQS
    });
    await part6.save();

    logger.info('Listening Test Set #1 data and score mappings seeded successfully!');
  } catch (error) {
    logger.error('Error seeding listening database data:', error);
  }
};

const seedSpeakingData = async () => {
  try {
    logger.info('Seeding Speaking Tasks 1-2, 3-4, 5, 6-8 for Test Sets 1-25...');

    for (let setNum = 1; setNum <= 25; setNum++) {
      await TestSet.findOneAndUpdate(
        { testSetNumber: setNum },
        {
          title: `CELPIP Practice Test ${setNum}`,
          description: `CELPIP-General practice test set ${setNum}`,
          status: 'published',
          modules: ['listening', 'reading', 'writing', 'speaking'],
          modeSupport: ['practice', 'simulation'],
          instructions: {
            practice: 'Standard practice mode. You can see sample responses and retry tasks.',
            simulation: 'Strict simulation mode. No sample responses; tab switching is logged.',
            speakingInstructionText:
              'Speak clearly into your microphone after the preparation time ends.',
          },
        },
        { upsert: true }
      );

      const task1Prompt = SPEAKING_TASK1_PROMPTS[setNum - 1];
      const task2Prompt = SPEAKING_TASK2_PROMPTS[setNum - 1];
      const task5Set = SPEAKING_TASK5_SETS[setNum - 1];
      const task6Prompt = SPEAKING_TASK6_PROMPTS[setNum - 1];
      const task7Prompt = SPEAKING_TASK7_PROMPTS[setNum - 1];
      if (!task1Prompt || !task2Prompt || !task5Set || !task6Prompt || !task7Prompt) {
        logger.warn(`Missing speaking prompt for test set ${setNum}; skipping.`);
        continue;
      }

      const task5Labels = getTask5Labels(task5Set);

      await SpeakingQuestion.findOneAndUpdate(
        { testSetNumber: setNum, taskNumber: 1, subTask: null },
        {
          module: 'speaking',
          testSetNumber: setNum,
          taskNumber: 1,
          prompt: `Giving Advice\n\n${task1Prompt}`,
          prepTime: 30,
          speakingTime: 90,
          introInstruction:
            'Task 1: Giving Advice. You will have 30 seconds to prepare and 90 seconds to speak.',
          mediaType: 'none',
        },
        { upsert: true }
      );

      await SpeakingQuestion.findOneAndUpdate(
        { testSetNumber: setNum, taskNumber: 2, subTask: null },
        {
          module: 'speaking',
          testSetNumber: setNum,
          taskNumber: 2,
          prompt: `Talking about a Personal Experience\n\n${task2Prompt}`,
          prepTime: 30,
          speakingTime: 60,
          introInstruction:
            'Task 2: Talking about a Personal Experience. You will have 30 seconds to prepare and 60 seconds to speak.',
          mediaType: 'none',
        },
        { upsert: true }
      );

      const sceneImageUrl = getSpeakingSceneImagePath(setNum);
      const sceneLabel = SPEAKING_SCENE_LABELS[setNum - 1] || `Scene ${setNum}`;

      await SpeakingQuestion.findOneAndUpdate(
        { testSetNumber: setNum, taskNumber: 3, subTask: null },
        {
          module: 'speaking',
          testSetNumber: setNum,
          taskNumber: 3,
          prompt: buildTask3Prompt(),
          prepTime: 30,
          speakingTime: 60,
          imageUrl: sceneImageUrl,
          mediaType: 'image',
          introInstruction: `Task 3: Describing a Scene (${sceneLabel}). You will have 30 seconds to prepare and 60 seconds to speak.`,
        },
        { upsert: true }
      );

      await SpeakingQuestion.findOneAndUpdate(
        { testSetNumber: setNum, taskNumber: 4, subTask: null },
        {
          module: 'speaking',
          testSetNumber: setNum,
          taskNumber: 4,
          prompt: buildTask4Prompt(setNum),
          prepTime: 30,
          speakingTime: 60,
          imageUrl: sceneImageUrl,
          mediaType: 'image',
          introInstruction: `Task 4: Making Predictions (${sceneLabel}). You will have 30 seconds to prepare and 60 seconds to speak.`,
        },
        { upsert: true }
      );

      await SpeakingQuestion.findOneAndUpdate(
        { testSetNumber: setNum, taskNumber: 5, subTask: 'A' },
        {
          module: 'speaking',
          testSetNumber: setNum,
          taskNumber: 5,
          subTask: 'A',
          prompt: buildTask5APrompt(task5Set),
          prepTime: 60,
          speakingTime: 0,
          introInstruction:
            'Task 5: Comparing and Persuading. Using the pictures and information below, choose the option that you prefer. You do not need to speak for this part.',
          ...task5Labels,
          ...getTask5OptionImages(task5Set),
          mediaType: task5Set.optionImages ? 'image' : 'none',
        },
        { upsert: true }
      );

      await SpeakingQuestion.findOneAndUpdate(
        { testSetNumber: setNum, taskNumber: 5, subTask: 'B' },
        {
          module: 'speaking',
          testSetNumber: setNum,
          taskNumber: 5,
          subTask: 'B',
          prompt: buildTask5BPrompt(task5Set),
          prepTime: 60,
          speakingTime: 60,
          introInstruction: `Task 5: Comparing and Persuading. Persuade ${task5Set.persuadeTarget} that your choice is the better option. You will have 60 seconds to prepare and 60 seconds to speak.`,
          mediaType: 'none',
        },
        { upsert: true }
      );

      await SpeakingQuestion.findOneAndUpdate(
        { testSetNumber: setNum, taskNumber: 6, subTask: null },
        {
          module: 'speaking',
          testSetNumber: setNum,
          taskNumber: 6,
          prompt: `Dealing with a Difficult Situation\n\n${task6Prompt}`,
          prepTime: 60,
          speakingTime: 60,
          introInstruction:
            'Task 6: Dealing with a Difficult Situation. You will have 60 seconds to prepare and 60 seconds to speak.',
          mediaType: 'none',
        },
        { upsert: true }
      );

      await SpeakingQuestion.findOneAndUpdate(
        { testSetNumber: setNum, taskNumber: 7, subTask: null },
        {
          module: 'speaking',
          testSetNumber: setNum,
          taskNumber: 7,
          prompt: `Expressing Opinions\n\n${task7Prompt}`,
          prepTime: 30,
          speakingTime: 90,
          introInstruction:
            'Task 7: Expressing Opinions. You will have 30 seconds to prepare and 90 seconds to speak.',
          mediaType: 'none',
        },
        { upsert: true }
      );

      const task8ImageUrl = getSpeakingTask8ImagePath(setNum);
      await SpeakingQuestion.findOneAndUpdate(
        { testSetNumber: setNum, taskNumber: 8, subTask: null },
        {
          module: 'speaking',
          testSetNumber: setNum,
          taskNumber: 8,
          prompt: buildTask8Prompt(setNum),
          prepTime: 30,
          speakingTime: 60,
          imageUrl: task8ImageUrl,
          mediaType: 'image',
          introInstruction:
            'Task 8: Describing an Unusual Situation. You will have 30 seconds to prepare and 60 seconds to speak.',
        },
        { upsert: true }
      );
    }

    for (let setNum = 1; setNum <= 25; setNum++) {
      await clearCachedQuestions(setNum);
    }

    logger.info('Speaking Tasks 1-2, 3-4, 5, 6-8 seeded for Test Sets 1-25 successfully!');
  } catch (error) {
    logger.error('Error seeding speaking database data:', error);
  }
};

const run = async () => {
  try {
    logger.info('Connecting to MongoDB for seeding...');
    await connectDB();
    await seedWritingData();
    await seedSpeakingData();
    await seedReadingData();
    await seedListeningData();
  } catch (error) {
    logger.error('Error in seeding database:', error);
  } finally {
    logger.info('Closing database connection...');
    await mongoose.connection.close();
    logger.info('Seeding finished.');
  }
};

run();
