/**
 * Grades a speaking task using Gemini 1.5 Flash
 * @param audioUrl - Public URL of the audio (e.g. Cloudinary)
 * @param taskPrompt - The original question prompt the student answered
 * @returns {Promise<any>} - A JSON object containing transcript, band, and analysis
 */
export declare const gradeSpeakingTask: (audioUrl: string, taskPrompt: string) => Promise<any>;
/** Single feedback string merged from structured writing fields — used after phase updates. */
export declare const buildBlendedCelpipWritingFeedback: (taskNumber: number, overall: number, overallRemark: string, categoryBullets: {
    coherenceMeaning: string[];
    vocabulary: string[];
    readability: string[];
    taskFulfillment: string[];
}, detailedFeedback: string, strengths: string[], improvements: string[], quickTips: string[], lineFeedback: Array<{
    original: string;
    issue: string;
    fix: string;
}>, modelAnswer: string) => string;
/**
 * Unified CELPIP Writing Grading: Scores + Detailed Narrative + Model Answer in one high-speed pass.
 * This eliminates sequential latencies and network round-trips, making responses 'quick fast'.
 */
export declare const gradeWritingTask: (responseText: string, taskPrompt: string, taskNumber?: number) => Promise<{
    overallBand: number;
    aiBand: number;
    coherenceMeaning: number;
    vocabulary: number;
    readability: number;
    taskFulfillment: number;
    categoryBullets: {
        coherenceMeaning: string[];
        vocabulary: string[];
        readability: string[];
        taskFulfillment: string[];
    };
    overallRemark: string;
    detailedFeedback: string;
    strengths: string[];
    improvements: string[];
    quickTips: string[];
    lineFeedback: {
        original: string;
        issue: string;
        fix: string;
    }[];
    modelAnswer: string;
    analysis: {
        coherence: number;
        vocabulary: number;
        readability: number;
        taskFulfillment: number;
        feedback: string;
    };
}>;
declare const _default: {
    gradeSpeakingTask: (audioUrl: string, taskPrompt: string) => Promise<any>;
    gradeWritingTask: (responseText: string, taskPrompt: string, taskNumber?: number) => Promise<{
        overallBand: number;
        aiBand: number;
        coherenceMeaning: number;
        vocabulary: number;
        readability: number;
        taskFulfillment: number;
        categoryBullets: {
            coherenceMeaning: string[];
            vocabulary: string[];
            readability: string[];
            taskFulfillment: string[];
        };
        overallRemark: string;
        detailedFeedback: string;
        strengths: string[];
        improvements: string[];
        quickTips: string[];
        lineFeedback: {
            original: string;
            issue: string;
            fix: string;
        }[];
        modelAnswer: string;
        analysis: {
            coherence: number;
            vocabulary: number;
            readability: number;
            taskFulfillment: number;
            feedback: string;
        };
    }>;
};
export default _default;
