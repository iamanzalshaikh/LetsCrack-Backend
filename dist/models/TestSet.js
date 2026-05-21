import mongoose from 'mongoose';
const TestSetSchema = new mongoose.Schema({
    testSetNumber: { type: Number, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    modeSupport: {
        type: [String],
        enum: ['practice', 'simulation'],
        default: ['practice', 'simulation'],
    },
    modules: {
        type: [String],
        enum: ['listening', 'reading', 'writing', 'speaking'],
        default: ['listening', 'reading', 'writing', 'speaking'],
    },
    estimatedTimeMinutes: { type: Number, default: 180 },
    instructions: {
        practice: { type: String, default: '' },
        simulation: { type: String, default: '' },
        writingInstructionText: { type: String, default: '' },
        writingInstructionVideoUrl: { type: String, default: '' },
        speakingInstructionText: { type: String, default: '' },
        speakingInstructionVideoUrl: { type: String, default: '' },
    },
    status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
    version: { type: Number, default: 1 },
    publishedAt: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
TestSetSchema.pre('save', function updateTimestamp(next) {
    this.updatedAt = new Date();
    next();
});
const TestSet = mongoose.model('TestSet', TestSetSchema);
export default TestSet;
export { TestSetSchema };
//# sourceMappingURL=TestSet.js.map