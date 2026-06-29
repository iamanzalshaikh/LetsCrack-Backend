import connectDB from '../src/config/database.js';
import QuestionBank from '../src/models/QuestionBank.js';
import mongoose from 'mongoose';

const check = async () => {
  await connectDB();
  const task = await QuestionBank.findOne({ module: 'listening', testSetNumber: 1, taskNumber: 1 });
  console.log('Task found:', !!task);
  if (task) {
    console.log('audioUrl:', task.audioUrl);
    console.log('mcqs count:', task.mcqs.length);
    console.log('Q1 properties:', JSON.stringify(task.mcqs[0], null, 2));
    console.log('Q2 properties:', JSON.stringify(task.mcqs[1], null, 2));
    console.log('Q3 properties:', JSON.stringify(task.mcqs[2], null, 2));
  }
  await mongoose.connection.close();
};

check();
