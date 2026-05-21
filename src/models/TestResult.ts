import mongoose from 'mongoose';

const TestResultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testSessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'TestSession' },
  testSetNumber: Number,
  writingBand: {
    task1Scores: { content: Number, vocab: Number, readability: Number, taskFulfillment: Number },
    task2Scores: { content: Number, vocab: Number, readability: Number, taskFulfillment: Number },
    finalBand: String
  },
  speakingBand: {
    taskScores: [{ 
      taskNumber: Number, 
      coherence: Number, 
      vocabulary: Number, 
      listenability: Number, 
      taskFulfillment: Number, 
      examinerFeedback: String 
    }],
    finalBand: String
  },
  readingBand: {
    score: Number,
    total: Number,
    percentage: Number,
    finalBand: String,
  },
  listeningBand: {
    score: Number,
    total: Number,
    percentage: Number,
    finalBand: String,
  },
  overallBand: String,
  examinerAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  scoredAt: Date,
  publishedAt: Date,
  certificateUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const TestResult = mongoose.model('TestResult', TestResultSchema);

export default TestResult;
export { TestResultSchema };