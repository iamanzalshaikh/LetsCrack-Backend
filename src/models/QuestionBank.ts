import mongoose from 'mongoose';

const QuestionBankSchema = new mongoose.Schema({
  module: { type: String, enum: ['writing', 'speaking', 'reading', 'listening'], required: true },
  testSetNumber: { type: Number, required: true },
  // Writing Task specific
  taskNumber: Number,
  scenario: { subheading: String, backgroundParagraph: String, taskInstructions: [String] },
  optionA: String, // Specifically for Writing Task 2
  optionB: String, // Specifically for Writing Task 2
  wordCountTarget: String,
  sampleResponse: String,
  // Speaking Task specific
  prompt: String,
  imageUrl: String,
  prepTime: Number,
  speakingTime: Number,
  sampleTranscript: String,
  // MCQ Specific (Reading/Listening)
  passageText: String, // For Reading
  audioUrl: String,   // For Listening
  mcqs: [{
    questionText: String,
    options: [String],    // Array of choices
    correctOption: Number // Index of the correct answer (0-3)
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const QuestionBank = mongoose.model('QuestionBank', QuestionBankSchema);

export default QuestionBank;
export { QuestionBankSchema };
