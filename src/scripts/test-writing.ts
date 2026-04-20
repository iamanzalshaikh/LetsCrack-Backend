import { gradeWritingTask } from '../utils/gemini.service.js';
import dotenv from 'dotenv';

dotenv.config();

const testWritingGrading = async () => {
  console.log('--- Starting Gemini AI Writing Grading Test ---');
  
  const samplePrompt = 'Write a letter to your manager explaining why you need a week off for a family emergency.';
  const sampleResponse = `
    Dear Manager, 
    I am writing this email to inform you that I need a week off starting from next Monday. 
    There is a serious family emergency that I need to attend to immediately. 
    I have already talked to my team members and they are willing to cover my tasks while I am away. 
    I will make sure to check my emails occasionally if there is anything urgent. 
    Thank you for your understanding.
    Best regards,
    John Doe
  `;

  try {
    console.log('Sending Writing response to Gemini...');
    const result = await gradeWritingTask(sampleResponse, samplePrompt);
    
    console.log('\n--- AI WRITING GRADING RESULT ---');
    console.log('Predicted Band:', result.aiBand);
    console.log('Feedback:', result.analysis.feedback);
    console.log('Breakdown:', JSON.stringify(result.analysis, null, 2));
    
    console.log('\nTest passed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
};

testWritingGrading();
