import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';
// Transporter configuration (e.g. Gmail/SendGrid)
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
/**
 * Sends a result notification email to the student
 *
 * @param studentEmail - The recipient's email address
 * @param studentName - The student's first name
 * @param testSetNumber - The test set completed
 * @param overallBand - The final CLB band calculated
 */
export const sendResultEmail = async (studentEmail, studentName, testSetNumber, overallBand) => {
    const mailOptions = {
        from: `"Let's Crack English" <${process.env.EMAIL_USER}>`,
        to: studentEmail,
        subject: `Your CELPIP Test Results - Set ${testSetNumber}`,
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #1B3A6B;">Congratulations, ${studentName}!</h2>
        <p>Your results for <strong>CELPIP Practice Test Set ${testSetNumber}</strong> are now available.</p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Overall CLB Band: <span style="color: #2563EB;">${overallBand}</span></h3>
        </div>
        <p>You can view your detailed criterion-based scores and feedback on your student dashboard.</p>
        <a href="${env.FRONTEND_URL}/student/dashboard" 
           style="background: #2563EB; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
           View Full Report
        </a>
        <p style="margin-top: 30px; font-size: 0.8em; color: #777;">
          This is an automated message. Please do not reply.
        </p>
      </div>
    `,
    };
    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Result email sent to ${studentEmail}`);
        return true;
    }
    catch (error) {
        logger.error('Email Delivery Error:', error);
        return false;
    }
};
export default { sendResultEmail, transporter };
//# sourceMappingURL=email.js.map