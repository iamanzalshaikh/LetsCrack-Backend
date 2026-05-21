import mongoose from 'mongoose';
const SurveyQuestionSchema = new mongoose.Schema({
    questionNumber: { type: Number, required: true },
    questionText: { type: String, required: true },
    questionType: {
        type: String,
        enum: ['rating_scale', 'multiple_choice', 'checkbox', 'open_ended'],
        required: true,
    },
    options: [String],
    wordCountTarget: String,
}, { _id: false });
const WritingQuestionSchema = new mongoose.Schema({
    module: {
        type: String,
        enum: ['writing'],
        default: 'writing',
        required: true,
        immutable: true,
    },
    testSetNumber: { type: Number, required: true },
    taskNumber: { type: Number, required: true, min: 1, max: 2 },
    timeLimit: { type: Number, required: true }, // seconds
    scenario: {
        subheading: String,
        backgroundParagraph: String,
        taskInstructions: [String],
    },
    wordCountTarget: String,
    surveyTopic: String,
    questions: [SurveyQuestionSchema],
    // Compatibility with current frontend payload for task 2.
    optionA: String,
    optionB: String,
    imageUrl: String,
    sampleResponse: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
WritingQuestionSchema.index({ testSetNumber: 1, taskNumber: 1 }, { unique: true });
WritingQuestionSchema.pre('save', function setUpdatedAt(next) {
    this.updatedAt = new Date();
    next();
});
const WritingQuestion = mongoose.model('WritingQuestion', WritingQuestionSchema);
export default WritingQuestion;
export { WritingQuestionSchema };
//# sourceMappingURL=WritingQuestion.js.map