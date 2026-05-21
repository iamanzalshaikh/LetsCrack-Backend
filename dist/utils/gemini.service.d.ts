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
/** Phase 1: compact JSON — arrives much faster than a single mega-response so the UI / sockets update quickly. */
export declare const gradeWritingTaskPhase1Scores: (responseText: string, taskPrompt: string, taskNumber?: number) => Promise<{
    overallBand: number;
    aiBand: number;
    coherenceMeaning: number;
    vocabulary: number;
    readability: number;
    taskFulfillment: number;
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammar: number;
    categoryBullets: {
        coherenceMeaning: string[];
        vocabulary: string[];
        readability: string[];
        taskFulfillment: string[];
    };
    overallRemark: string;
    strengths: string[];
    improvements: string[];
    quickTips: string[];
}>;
/** Phase 2: narrative + model answer — heavier; runs after bands are persisted. */
export declare const gradeWritingTaskPhase2Narrative: (responseText: string, taskPrompt: string, taskNumber: number, anchor: {
    overallBand: number;
    overallRemark: string;
}) => Promise<{
    detailedFeedback: string;
    modelAnswer: string;
    lineFeedback: Array<{
        original: string;
        issue: string;
        fix: string;
    }>;
}>;
export declare const mergeWritingPhasesToGradeResult: (taskNumber: number, p1: Awaited<ReturnType<typeof gradeWritingTaskPhase1Scores>>, p2: Awaited<ReturnType<typeof gradeWritingTaskPhase2Narrative>>) => {
    overallBand: number;
    aiBand: number;
    coherenceMeaning: number;
    vocabulary: number;
    readability: number;
    taskFulfillment: number;
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammar: number;
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
};
/**
 * CELPIP Writing (Tasks 1 & 2): band /6, four dimensions @25% each, CELPIP-style feedback (not IELTS).
 * Full single-call path (scripts / tests). Production worker uses phase1 + phase2 for faster first paint.
 */
export declare const gradeWritingTask: (responseText: string, taskPrompt: string, taskNumber?: number) => Promise<{
    overallBand: number;
    aiBand: number;
    coherenceMeaning: number;
    vocabulary: number;
    readability: number;
    taskFulfillment: number;
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammar: number;
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
        taskAchievement: number;
        coherenceCohesion: number;
        lexicalResource: number;
        grammar: number;
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
