import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
import { env } from '../config/env.js';
import logger from './logger.js';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

/**
 * Grades a speaking task using Gemini 1.5 Flash
 * @param audioUrl - The public URL of the audio recording in S3
 * @param taskPrompt - The original question prompt the student answered
 * @returns {Promise<any>} - A JSON object containing transcript, band, and analysis
 */
export const gradeSpeakingTask = async (audioUrl: string, taskPrompt: string) => {
  try {
    logger.info(`Starting AI grading for audio: ${audioUrl}`);

    // 1. Fetch audio from S3
    const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
    const audioBase64 = Buffer.from(response.data).toString('base64');

    // 2. Prepare the AI prompt
    const aiPrompt = `
      You are an expert CELPIP Speaking Examiner. Analyze the provided audio response to this prompt: 
      "${taskPrompt}"

      Your goal is to:
      1. Provide a verbatim transcript of the audio.
      2. Assign a CELPIP Band (1 to 12) based on official standards.
      3. Evaluate four criteria (each 1 to 12): Coherence, Vocabulary, Listenability, and Task Fulfillment.
      4. Provide constructive feedback for the student in 2-3 sentences.

      IMPORTANT: Return your response ONLY as a JSON object with this exact structure:
      {
        "transcript": "Verbatim transcript here...",
        "aiBand": Number,
        "analysis": {
          "coherence": Number,
          "vocabulary": Number,
          "listenability": Number,
          "taskFulfillment": Number,
          "feedback": "Constructive feedback here..."
        }
      }
    `;

    // 3. Send to Gemini
    const result = await model.generateContent([
      aiPrompt,
      {
        inlineData: {
          data: audioBase64,
          mimeType: "audio/webm"
        }
      }
    ]);

    const resultText = result.response.text();
    
    // 4. Parse and return JSON
    const cleanedJson = resultText.replace(/```json|```/g, '').trim();
    const parsedResult = JSON.parse(cleanedJson);

    logger.info('AI grading completed successfully');
    return parsedResult;
  } catch (error) {
    logger.error('Gemini AI Service Error:', error);
    throw new Error('Failed to process AI grading');
  }
};

/**
 * Grades a writing task using Gemini 1.5 Flash
 * @param responseText - The student's written response
 * @param taskPrompt - The original question prompt
 * @returns {Promise<any>} - A JSON object containing band and analysis
 */
export const gradeWritingTask = async (responseText: string, taskPrompt: string) => {
  try {
    logger.info(`Starting AI grading for writing response...`);

    const aiPrompt = `
      You are an expert CELPIP Writing Examiner. Analyze the following student response to this prompt:
      "${taskPrompt}"

      Student Response:
      "${responseText}"

      Your goal is to:
      1. Assign a CELPIP Band (1 to 12) based on official standards.
      2. Evaluate four criteria (each 1 to 12): Coherence, Vocabulary, Readability, and Task Fulfillment.
      3. Provide constructive feedback for the student in 2-3 sentences.

      IMPORTANT: Return your response ONLY as a JSON object with this exact structure:
      {
        "aiBand": Number,
        "analysis": {
          "coherence": Number,
          "vocabulary": Number,
          "readability": Number,
          "taskFulfillment": Number,
          "feedback": "Constructive feedback here..."
        }
      }
    `;

    const result = await model.generateContent(aiPrompt);
    const resultText = result.response.text();
    
    const cleanedJson = resultText.replace(/```json|```/g, '').trim();
    const parsedResult = JSON.parse(cleanedJson);

    logger.info('AI Writing grading completed successfully');
    return parsedResult;
  } catch (error) {
    logger.error('Gemini Writing AI Service Error:', error);
    throw new Error('Failed to process AI writing grading');
  }
};

export default { gradeSpeakingTask, gradeWritingTask };
