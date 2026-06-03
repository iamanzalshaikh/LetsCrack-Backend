import mongoose from 'mongoose';

const ScoreMappingSchema = new mongoose.Schema({
  module: { type: String, enum: ['reading', 'listening'], required: true },
  testSetNumber: Number, // Optional: if a specific test set has unique curve mappings
  mappings: [{
    minScore: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    band: { type: String, required: true }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ScoreMapping = mongoose.model('ScoreMapping', ScoreMappingSchema);

export default ScoreMapping;
export { ScoreMappingSchema };
