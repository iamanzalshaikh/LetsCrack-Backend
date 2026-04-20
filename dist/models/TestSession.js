import mongoose from 'mongoose';
const TestSessionSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    testSetNumber: { type: Number, required: true },
    startedAt: { type: Date, default: Date.now },
    completedAt: Date,
    status: { type: String, enum: ['in_progress', 'submitted', 'graded'], default: 'in_progress' },
    writingResponses: [{
            taskNumber: Number,
            responseText: String,
            wordCount: Number,
            selectedOption: String, // For Task 2 (Option A or B)
            autoSavedAt: Date,
            submittedAt: Date,
            timeTakenSeconds: Number
        }],
    speakingRecordings: [{
            taskNumber: Number,
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
            questionId: mongoose.Schema.Types.ObjectId,
            selectedOption: Number,
            isCorrect: Boolean
        }],
    mcqScore: { type: Number, default: 0 }
});
const TestSession = mongoose.model('TestSession', TestSessionSchema);
export default TestSession;
export { TestSessionSchema };
//# sourceMappingURL=TestSession.js.map