import { Response } from 'express';
interface CertificateData {
    studentName: string;
    testSetNumber: number;
    writingBand: string;
    speakingBand: string;
    overallBand: string;
    date: string;
}
/**
 * Generates a formal CELPIP Practice Certificate as a PDF stream
 *
 * @param res - The Express response object to stream the PDF to
 * @param data - The student's score and band details
 */
export declare const generateCertificate: (res: Response, data: CertificateData) => void;
declare const _default: {
    generateCertificate: (res: Response, data: CertificateData) => void;
};
export default _default;
