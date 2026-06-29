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
    mediaType: { type: String, enum: ['none', 'audio', 'video', 'image'], default: 'none' },
    mediaUrl: String,
    instructionVideoUrl: String,
    allowReplay: { type: Boolean, default: true },
    allowSeek: { type: Boolean, default: true },
    playLimit: { type: Number, default: 0 }, // 0 => unlimited
    imageUrl: String,
    prepTime: Number,
    speakingTime: Number,
    sampleTranscript: String,
    // MCQ Specific (Reading/Listening)
    passageText: String, // For Reading
    audioUrl: String, // For Listening
    mcqs: [{
            questionText: String,
            options: [String], // Array of choices
            correctOption: Number, // Index of the correct answer (0-3)
            questionAudioUrl: String,
            sectionAudioUrl: String,
            sectionImage: String,
            sectionIntroText: String,
            sectionScript: String
        }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    // Generic assessment engine properties
    title: String,
    instructions: String,
    instructionsPage2: String,
    partInstructionsText: String,
    timerSeconds: Number,
    layoutType: { type: String, enum: ['split', 'single'], default: 'split' },
    questionPoolId: String,
    leftPanel: {
        type: { type: String, enum: ['markdown', 'image', 'audio', 'none'], default: 'markdown' },
        contentBlocks: [String],
        mediaUrl: String
    },
    rightPanel: {
        sections: [{
                type: { type: String, enum: ['standalone_dropdown', 'inline_dropdown', 'paragraph_match', 'mcq'] },
                template: String,
                questions: [{
                        id: String,
                        type: { type: String, enum: ['single_select', 'inline_select', 'multi_select', 'text_input'] },
                        label: String,
                        options: [String],
                        correctAnswer: mongoose.Schema.Types.Mixed,
                        order: Number
                    }],
                matchingQuestions: [{
                        id: String,
                        statement: String,
                        correctParagraph: String,
                        order: Number
                    }]
            }]
    },
    metadata: {
        difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
        tags: [String],
        source: String,
        estimatedTime: Number
    }
});
QuestionBankSchema.index({ testSetNumber: 1, module: 1, taskNumber: 1 });
const QuestionBank = mongoose.model('QuestionBank', QuestionBankSchema);
export default QuestionBank;
export { QuestionBankSchema };
//# sourceMappingURL=QuestionBank.js.map