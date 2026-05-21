import { Response } from 'express';
interface CertificateData {
    studentName: string;
    testSetNumber: number;
    writingBand: string;
    speakingBand: string;
    overallBand: string;
    date: string;
}
interface AiReportTask {
    taskNumber: number;
    responseText?: string;
    wordCount?: number;
    overallBand?: number | string;
    coherence?: number | string;
    vocabulary?: number | string;
    readability?: number | string;
    taskFulfillment?: number | string;
    taskAchievement?: number | string;
    coherenceCohesion?: number | string;
    lexicalResource?: number | string;
    grammar?: number | string;
    overallRemark?: string;
    detailedFeedback?: string;
    categoryBullets?: {
        coherenceMeaning?: string[];
        vocabulary?: string[];
        readability?: string[];
        taskFulfillment?: string[];
    };
    strengths?: string[];
    improvements?: string[];
    quickTips?: string[];
    lineFeedback?: Array<{
        original?: string;
        issue?: string;
        fix?: string;
    }>;
    modelAnswer?: string;
}
interface AiEvaluationReportData {
    studentName: string;
    testSetNumber: number;
    generatedAt: string;
    overallBand?: string | number;
    writingBand?: string | number;
    tasks: AiReportTask[];
}
/**
 * Generates a formal CELPIP Practice Certificate as a PDF stream
 *
 * @param res - The Express response object to stream the PDF to
 * @param data - The student's score and band details
 */
export declare const generateCertificate: (res: Response, data: CertificateData) => void;
/**
 * Generate task-wise AI evaluation PDF — LetsCrack template (summary page + detailed page(s) per task).
 * ✅ AGGRESSIVE FIX: Eliminates excessive spacing gaps
 */
export declare const generateAiEvaluationReport: (res: Response, data: AiEvaluationReportData) => void;
declare const _default: {
    generateCertificate: (res: Response, data: CertificateData) => void;
    generateAiEvaluationReport: (res: Response, data: AiEvaluationReportData) => void;
};
export default _default;
