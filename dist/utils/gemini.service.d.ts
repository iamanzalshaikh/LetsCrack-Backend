/**
 * Grades a speaking task using Gemini 1.5 Flash
 * @param audioUrl - The public URL of the audio recording in S3
 * @param taskPrompt - The original question prompt the student answered
 * @returns {Promise<any>} - A JSON object containing transcript, band, and analysis
 */
export declare const gradeSpeakingTask: (audioUrl: string, taskPrompt: string) => Promise<any>;
declare const _default: {
    gradeSpeakingTask: (audioUrl: string, taskPrompt: string) => Promise<any>;
};
export default _default;
