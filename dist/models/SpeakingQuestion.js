import mongoose from 'mongoose';
const SpeakingQuestionSchema = new mongoose.Schema({
    module: {
        type: String,
        enum: ['speaking'],
        default: 'speaking',
        required: true,
        immutable: true,
    },
    testSetNumber: { type: Number, required: true },
    taskNumber: { type: Number, required: true, min: 1, max: 8 },
    subTask: { type: String, enum: ['A', 'B'], default: null },
    prompt: { type: String, required: true },
    introInstruction: String,
    speakingIntroVideoUrl: String,
    task5IntroVideoUrl: String,
    prepTime: { type: Number, required: true },
    speakingTime: { type: Number, required: true },
    imageUrl: String,
    /** Task 5A: left / right option images (CELPIP-style compare). */
    imageUrlA: String,
    imageUrlB: String,
    imageUrlC: String,
    optionALabel: String,
    optionBLabel: String,
    optionCLabel: String,
    sampleTranscript: String,
    mediaType: { type: String, enum: ['none', 'audio', 'video', 'image'], default: 'none' },
    mediaUrl: String,
    instructionVideoUrl: String,
    allowReplay: { type: Boolean, default: true },
    allowSeek: { type: Boolean, default: true },
    playLimit: { type: Number, default: 0 }, // 0 => unlimited
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
SpeakingQuestionSchema.index({ testSetNumber: 1, taskNumber: 1, subTask: 1 }, { unique: true });
SpeakingQuestionSchema.pre('save', function setUpdatedAt(next) {
    this.updatedAt = new Date();
    next();
});
const SpeakingQuestion = mongoose.model('SpeakingQuestion', SpeakingQuestionSchema);
export default SpeakingQuestion;
export { SpeakingQuestionSchema };
//# sourceMappingURL=SpeakingQuestion.js.map