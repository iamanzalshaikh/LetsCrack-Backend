import PDFDocument from 'pdfkit';
import { Response } from 'express';
import logger from '../utils/logger.js';

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
export const generateCertificate = (res: Response, data: CertificateData) => {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });

  // Stream directly to the response
  doc.pipe(res);

  // --- Header ---
  doc.fillColor('#1B3A6B')
     .fontSize(25)
     .text("LET'S CRACK ENGLISH", { align: 'center' });
  
  doc.fontSize(15)
     .text('CELPIP Practice Platform - Statement of Results', { align: 'center' });

  doc.moveDown(2);

  // --- Border ---
  doc.rect(20, 20, 555, 782).stroke();

  // --- Recipient Info ---
  doc.fillColor('#000000')
     .fontSize(12)
     .text('This is to certify that:', { align: 'left' });
  
  doc.fontSize(20)
     .text(data.studentName, { align: 'left', underline: true });

  doc.moveDown();
  doc.fontSize(12)
     .text(`has successfully completed CELPIP Practice Test Set ${data.testSetNumber} on ${data.date}.`);

  doc.moveDown(2);

  // --- Scores Table ---
  doc.fontSize(16)
     .fillColor('#1B3A6B')
     .text('Skill Performance Report', { underline: true });
  
  doc.moveDown();
  
  const drawRow = (label: string, band: string, y: number) => {
    doc.fillColor('#000000').fontSize(12).text(label, 70, y);
    doc.fillColor('#2563EB').fontSize(14).text(`CLB Band: ${band}`, 300, y);
  };

  let currentY = doc.y;
  drawRow('Writing Module', data.writingBand || 'N/A', currentY);
  currentY += 30;
  drawRow('Speaking Module', data.speakingBand || 'N/A', currentY);
  currentY += 30;
  
  doc.rect(50, currentY, 495, 2).fill('#1B3A6B'); // Horizontal line
  currentY += 15;
  
  doc.fillColor('#1B3A6B')
     .fontSize(16)
     .text('Overall CELPIP Level', 70, currentY);
  
  doc.fontSize(20)
     .font('Helvetica-Bold')
     .text(data.overallBand, 300, currentY);

  // --- Footer ---
  doc.moveDown(5);
  doc.fontSize(10)
     .fillColor('#777777')
     .text('Note: This is an unofficial practice report for educational purposes only.', { align: 'center' });

  doc.text(`Certificate ID: LCE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, { align: 'center' });

  // Finalize the PDF
  doc.end();
  logger.info(`Certificate generated and streamed for ${data.studentName}`);
};

export default { generateCertificate };
