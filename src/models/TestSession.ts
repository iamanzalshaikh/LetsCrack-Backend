import mongoose from 'mongoose';

const TestSessionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testSetNumber: { type: Number, required: true },
  mode: { type: String, enum: ['practice', 'simulation'], default: 'practice' },
  selectedModules: [{ type: String, enum: ['listening', 'reading', 'writing', 'speaking'] }],
  instructionsAccepted: { type: Boolean, default: false },
  startedAt: { type: Date, default: Date.now },
  completedAt: Date,
  purgeAt: Date,
  purgedAt: Date,
  status: { type: String, enum: ['in_progress', 'submitted', 'graded'], default: 'in_progress' },
  /** Set when the student ends the test early; blocks new AI grading and skips queued jobs. */
  endedEarly: { type: Boolean, default: false },
  /** Simulation writing: null = not set (infer from progress), positive = only that task is editable, -1 = writing finished */
  writingCursorTask: { type: Number, default: null },
  simulationFocusLossCount: { type: Number, default: 0 },
  /** Simulation-only timeline (capped server-side on push). */
  simulationIntegrityEvents: [{
    kind: { type: String, required: true },
    at: { type: Date, default: Date.now },
    durationMs: { type: Number },
    focused: { type: Boolean },
  }],
  writingResponses: [{
    taskNumber: Number,
    responseText: String,
    wordCount: Number,
    selectedOption: String, // For Task 2 (Option A or B)
    autoSavedAt: Date,
    submittedAt: Date,
    timeTakenSeconds: Number,
    aiBand: Number,
    aiAnalysis: {
      coherence: Number,
      vocabulary: Number,
      readability: Number,
      taskFulfillment: Number,
      feedback: String,
      taskAchievement: Number,
      coherenceCohesion: Number,
      lexicalResource: Number,
      grammar: Number,
      strengths: [String],
      improvements: [String],
      quickTips: [String],
      lineFeedback: [{
        original: String,
        issue: String,
        fix: String,
      }],
      modelAnswer: String,
      overallRemark: String,
      detailedFeedback: String,
      categoryBullets: {
        coherenceMeaning: [String],
        vocabulary: [String],
        readability: [String],
        taskFulfillment: [String],
      },
    }
  }],
  speakingRecordings: [{
    taskNumber: Number,
    subTask: { type: String, default: null },
    audioUrl: String,
    audioDuration: Number,
    recordedAt: Date,
    submittedAt: Date,
    transcript: String,
    aiBand: Number,
    aiAnalysis: {
      coherence: Number,
      vocabulary: Number,
      listenability: Number,
      taskFulfillment: Number,
      feedback: String
    }
  }],
  // MCQ Support (Reading/Listening)
  mcqResponses: [{
    module: { type: String, enum: ['reading', 'listening'] },
    questionId: mongoose.Schema.Types.ObjectId,
    selectedOption: Number,
    isCorrect: Boolean
  }],
  mcqScore: { type: Number, default: 0 },
  mediaRuntime: [{
    module: { type: String, enum: ['listening', 'reading', 'writing', 'speaking'] },
    taskNumber: { type: Number, default: 1 },
    subTask: { type: String, default: null },
    playCount: { type: Number, default: 0 },
    seekCount: { type: Number, default: 0 },
    blockedCount: { type: Number, default: 0 },
    lastEventAt: Date,
  }]
});

const TestSession = mongoose.model('TestSession', TestSessionSchema);

export default TestSession;
export { TestSessionSchema };
