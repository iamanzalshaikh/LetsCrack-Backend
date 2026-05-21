import { gradeSpeakingTask } from '../utils/gemini.service.js';
import dotenv from 'dotenv';
// Load env vars
dotenv.config();
const testAiGrading = async () => {
    console.log('--- Starting Gemini AI Grading Test ---');
    // Use a public sample audio from any public host (for example Cloudinary).
    // This is a sample MP3 link for testing.
    const sampleAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    const samplePrompt = 'Tell me about your favorite childhood memory.';
    try {
        console.log('Sending request to Gemini...');
        const result = await gradeSpeakingTask(sampleAudioUrl, samplePrompt);
        console.log('\n--- AI GRADING RESULT ---');
        console.log('Transcript:', result.transcript);
        console.log('Predicted Band:', result.aiBand);
        console.log('Feedback:', result.analysis.feedback);
        console.log('Breakdown:', JSON.stringify(result.analysis, null, 2));
        console.log('\nTest passed successfully!');
    }
    catch (error) {
        console.error('Test failed:', error);
    }
};
testAiGrading();
//# sourceMappingURL=test-gemini.js.map