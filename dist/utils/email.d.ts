import nodemailer from 'nodemailer';
/**
 * Sends a result notification email to the student
 *
 * @param studentEmail - The recipient's email address
 * @param studentName - The student's first name
 * @param testSetNumber - The test set completed
 * @param overallBand - The final CLB band calculated
 */
export declare const sendResultEmail: (studentEmail: string, studentName: string, testSetNumber: number, overallBand: string) => Promise<boolean>;
declare const _default: {
    sendResultEmail: (studentEmail: string, studentName: string, testSetNumber: number, overallBand: string) => Promise<boolean>;
    transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo, import("nodemailer/lib/smtp-transport/index.js").Options>;
};
export default _default;
