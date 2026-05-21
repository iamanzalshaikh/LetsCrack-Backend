// // import PDFDocument from 'pdfkit';
// // import { Response } from 'express';
// // import logger from '../utils/logger.js';
// // interface CertificateData {
// //   studentName: string;
// //   testSetNumber: number;
// //   writingBand: string;
// //   speakingBand: string;
// //   overallBand: string;
// //   date: string;
// // }
// // interface AiReportTask {
// //   taskNumber: number;
// //   responseText?: string;
// //   wordCount?: number;
// //   overallBand?: number | string;
// //   coherence?: number | string;
// //   vocabulary?: number | string;
// //   readability?: number | string;
// //   taskFulfillment?: number | string;
// //   taskAchievement?: number | string;
// //   coherenceCohesion?: number | string;
// //   lexicalResource?: number | string;
// //   grammar?: number | string;
// //   overallRemark?: string;
// //   detailedFeedback?: string;
// //   categoryBullets?: {
// //     coherenceMeaning?: string[];
// //     vocabulary?: string[];
// //     readability?: string[];
// //     taskFulfillment?: string[];
// //   };
// //   strengths?: string[];
// //   improvements?: string[];
// //   quickTips?: string[];
// //   lineFeedback?: Array<{ original?: string; issue?: string; fix?: string }>;
// //   modelAnswer?: string;
// // }
// // interface AiEvaluationReportData {
// //   studentName: string;
// //   testSetNumber: number;
// //   generatedAt: string;
// //   overallBand?: string | number;
// //   writingBand?: string | number;
// //   tasks: AiReportTask[];
// // }
// // /**
// //  * Generates a formal CELPIP Practice Certificate as a PDF stream
// //  * 
// //  * @param res - The Express response object to stream the PDF to
// //  * @param data - The student's score and band details
// //  */
// // export const generateCertificate = (res: Response, data: CertificateData) => {
// //   const doc = new PDFDocument({ margin: 50, size: 'A4' });
// //   // Stream directly to the response
// //   doc.pipe(res);
// //   // --- Header ---
// //   doc.fillColor('#1B3A6B')
// //      .fontSize(25)
// //      .text("LET'S CRACK ENGLISH", { align: 'center' });
// //   doc.fontSize(15)
// //      .text('CELPIP Practice Platform - Statement of Results', { align: 'center' });
// //   doc.moveDown(2);
// //   // --- Border ---
// //   doc.rect(20, 20, 555, 782).stroke();
// //   // --- Recipient Info ---
// //   doc.fillColor('#000000')
// //      .fontSize(12)
// //      .text('This is to certify that:', { align: 'left' });
// //   doc.fontSize(20)
// //      .text(data.studentName, { align: 'left', underline: true });
// //   doc.moveDown();
// //   doc.fontSize(12)
// //      .text(`has successfully completed CELPIP Practice Test Set ${data.testSetNumber} on ${data.date}.`);
// //   doc.moveDown(2);
// //   // --- Scores Table ---
// //   doc.fontSize(16)
// //      .fillColor('#1B3A6B')
// //      .text('Skill Performance Report', { underline: true });
// //   doc.moveDown();
// //   const drawRow = (label: string, band: string, y: number) => {
// //     doc.fillColor('#000000').fontSize(12).text(label, 70, y);
// //     doc.fillColor('#2563EB').fontSize(14).text(`CLB Band: ${band}`, 300, y);
// //   };
// //   let currentY = doc.y;
// //   drawRow('Writing Module', data.writingBand || 'N/A', currentY);
// //   currentY += 30;
// //   drawRow('Speaking Module', data.speakingBand || 'N/A', currentY);
// //   currentY += 30;
// //   doc.rect(50, currentY, 495, 2).fill('#1B3A6B'); // Horizontal line
// //   currentY += 15;
// //   doc.fillColor('#1B3A6B')
// //      .fontSize(16)
// //      .text('Overall CELPIP Level', 70, currentY);
// //   doc.fontSize(20)
// //      .font('Helvetica-Bold')
// //      .text(data.overallBand, 300, currentY);
// //   // --- Footer ---
// //   doc.moveDown(5);
// //   doc.fontSize(10)
// //      .fillColor('#777777')
// //      .text('Note: This is an unofficial practice report for educational purposes only.', { align: 'center' });
// //   doc.text(`Certificate ID: LCE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, { align: 'center' });
// //   // Finalize the PDF
// //   doc.end();
// //   logger.info(`Certificate generated and streamed for ${data.studentName}`);
// // };
// // /** LetsCrack English — AI Writing report visual system (matches brand PDF templates). */
// // const LC = {
// //   cream: '#FAF8F5',
// //   blueSoft: '#C5E8F7',
// //   blueDeep: '#1E88B0',
// //   blueBrand: '#2E86AB',
// //   border: '#1a1a1a',
// //   footerUrl: 'WWW.LETSCRACKENGLISH.COM',
// // };
// // function writingTaskSubtitle(taskNumber: number): string {
// //   return taskNumber === 1 ? 'WRITING AN EMAIL' : 'RESPONDING TO SURVEY QUESTIONS';
// // }
// // function formatCategoryBullets(items: string[] | undefined): string {
// //   if (!items?.length) return '—';
// //   return items.slice(0, 4).map((s) => `• ${s}`).join('\n');
// // }
// // /** Four-petal logo (approximation of brand mark). */
// // function drawLetsCrackLogo(doc: InstanceType<typeof PDFDocument>, cx: number, cy: number, petalR: number, color: string) {
// //   doc.save();
// //   doc.fillColor(color);
// //   const d = petalR * 1.05;
// //   doc.circle(cx, cy - d, petalR).fill();
// //   doc.circle(cx, cy + d, petalR).fill();
// //   doc.circle(cx - d, cy, petalR).fill();
// //   doc.circle(cx + d, cy, petalR).fill();
// //   doc.restore();
// // }
// // function drawBrandHeader(
// //   doc: InstanceType<typeof PDFDocument>,
// //   pageWidth: number,
// //   margin: number,
// //   taskNumber: number,
// //   withSubtitle: boolean,
// // ) {
// //   const cx = pageWidth / 2;
// //   const yStart = 38;
// //   drawLetsCrackLogo(doc, cx, yStart + 10, 7, LC.blueDeep);
// //   doc
// //     .font('Helvetica-Bold')
// //     .fontSize(9)
// //     .fillColor(LC.blueBrand)
// //     .text("LET'S CRACK ENGLISH", margin, yStart + 28, {
// //       align: 'center',
// //       width: pageWidth - margin * 2,
// //     });
// //   doc
// //     .font('Times-Bold')
// //     .fontSize(18)
// //     .fillColor('#111111')
// //     .text(`WRITING TASK-${taskNumber} REPORT`, margin, yStart + 42, {
// //       align: 'center',
// //       width: pageWidth - margin * 2,
// //     });
// //   if (withSubtitle) {
// //     doc
// //       .font('Times-Bold')
// //       .fontSize(11)
// //       .fillColor('#111111')
// //       .text(`(${writingTaskSubtitle(taskNumber)})`, margin, yStart + 62, {
// //         align: 'center',
// //         width: pageWidth - margin * 2,
// //       });
// //     return yStart + 82;
// //   }
// //   return yStart + 72;
// // }
// // function strokeRect(doc: InstanceType<typeof PDFDocument>, x: number, y: number, w: number, h: number) {
// //   doc.save();
// //   doc.lineWidth(0.65).strokeColor(LC.border);
// //   doc.rect(x, y, w, h).stroke();
// //   doc.restore();
// // }
// // function drawPageFooter(doc: InstanceType<typeof PDFDocument>, pageWidth: number, margin: number) {
// //   doc.save();
// //   doc.font('Helvetica').fontSize(8).fillColor('#333333');
// //   doc.fillColor('#333333').text(LC.footerUrl, margin, 805, {
// //     width: pageWidth - margin * 2,
// //     align: 'center',
// //   });
// //   doc.restore();
// // }
// // function drawWatermarkLogo(
// //   doc: InstanceType<typeof PDFDocument>,
// //   pageWidth: number,
// //   midY: number,
// //   scale: number,
// // ) {
// //   doc.save();
// //   doc.opacity(0.05);
// //   drawLetsCrackLogo(doc, pageWidth / 2, midY, 28 * scale, LC.blueDeep);
// //   doc.restore();
// // }
// // function drawLinedContentBackground(
// //   doc: InstanceType<typeof PDFDocument>,
// //   margin: number,
// //   y0: number,
// //   y1: number,
// //   contentW: number,
// // ) {
// //   doc.save();
// //   doc.strokeColor('#d8d8d8').lineWidth(0.3).opacity(0.38);
// //   const lineGap = 16;
// //   for (let y = y0; y < y1; y += lineGap) {
// //     doc.moveTo(margin, y).lineTo(margin + contentW, y).stroke();
// //   }
// //   doc.restore();
// // }
// // /** Split plain text so the first slice fits vertically at the given width (PDFKit). */
// // function takeTextChunk(
// //   doc: InstanceType<typeof PDFDocument>,
// //   text: string,
// //   width: number,
// //   maxHeight: number,
// //   fontSize: number,
// //   lineGap: number,
// //   fontFace: 'Helvetica' | 'Helvetica-Bold' = 'Helvetica',
// // ): { chunk: string; rest: string } {
// //   const t = text.trimStart();
// //   if (!t) return { chunk: '', rest: '' };
// //   /** PDFKit can lay out slightly taller than heightOfString; stay under ceiling. */
// //   const budget = Math.max(14, maxHeight * 0.96);
// //   doc.font(fontFace).fontSize(fontSize);
// //   const opts = { width, lineGap } as const;
// //   const hFull = doc.heightOfString(t, opts);
// //   if (hFull <= budget) return { chunk: t, rest: '' };
// //   let lo = 1;
// //   let hi = t.length;
// //   let best = 1;
// //   while (lo <= hi) {
// //     const mid = (lo + hi) >> 1;
// //     const h = doc.heightOfString(t.slice(0, mid), opts);
// //     if (h <= budget) {
// //       best = mid;
// //       lo = mid + 1;
// //     } else hi = mid - 1;
// //   }
// //   let cut = best;
// //   const br = t.lastIndexOf('\n\n', cut);
// //   const paragraphBreak = br >= 0 ? br + 2 : -1;
// //   const sp = t.lastIndexOf(' ', cut);
// //   const softBreak = sp >= 40 ? sp + 1 : -1;
// //   const preferNice = paragraphBreak >= 40 ? paragraphBreak : softBreak;
// //   if (preferNice >= 40 && preferNice <= cut && doc.heightOfString(t.slice(0, preferNice), opts) <= budget) {
// //     cut = preferNice;
// //   }
// //   let chunk = t.slice(0, cut).trimEnd();
// //   /** Never return empty chunk when there is remainder (prevents footer-only filler pages). */
// //   if (!chunk.length) {
// //     const first = [...t][0] ?? '';
// //     const restChars = [...t].slice(1).join('');
// //     return { chunk: first, rest: restChars.trimStart() };
// //   }
// //   const rest = t.slice(cut).trimStart();
// //   /** If trimming removed trailing newlines/spaces inside [0,cut), same rest stays valid. */
// //   return { chunk, rest };
// // }
// // /** Strip lightweight markdown noise from paragraph copy (PDF has no Markdown engine). */
// // function stripInlineMarkdownForPdf(s: string): string {
// //   return s
// //     .replace(/\*\*([^*]+)\*\*/g, '$1')
// //     .replace(/__([^_]+)__/g, '$1')
// //     .replace(/\*([^*]+)\*/g, '$1')
// //     .replace(/_([^_]+)_/g, '$1')
// //     .replace(/`{1,3}([^`]+)`{1,3}/g, '$1')
// //     .replace(/^[-*+]\s+/gm, '• ')
// //     .replace(/^\s*#{1,6}\s+/gm, '');
// // }
// // type DetailedSegment =
// //   | { type: 'h'; level: 1 | 2 | 3; text: string }
// //   | { type: 'rule' }
// //   | { type: 'p'; text: string };
// // /** Turn AI markdown-ish feedback into drawable segments with real headings (no "###" glyphs). */
// // function parseDetailedFeedbackMarkdown(full: string): DetailedSegment[] {
// //   const text = full.replace(/\r\n/g, '\n').trim();
// //   const lines = text.split('\n');
// //   const segments: DetailedSegment[] = [];
// //   let buf: string[] = [];
// //   const flushParagraph = () => {
// //     const raw = buf.join('\n').trim();
// //     buf = [];
// //     if (!raw) return;
// //     segments.push({ type: 'p', text: stripInlineMarkdownForPdf(raw) });
// //   };
// //   const H_RE = /^\s{0,3}(#{1,6})\s*(.+?)\s*$/;
// //   const RULE_RE = /^\s*(?:[-*_]\s*){3,}\s*$/;
// //   const EM_DASH_RULE = /^\s*[—\-=]{3,}\s*$/;
// //   for (const line of lines) {
// //     if (!line.trim()) {
// //       flushParagraph();
// //       continue;
// //     }
// //     if (RULE_RE.test(line) || EM_DASH_RULE.test(line)) {
// //       flushParagraph();
// //       segments.push({ type: 'rule' });
// //       continue;
// //     }
// //     const hm = H_RE.exec(line);
// //     if (hm) {
// //       flushParagraph();
// //       const n = Math.min(3, Math.max(1, hm[1].length));
// //       const title = stripInlineMarkdownForPdf(hm[2]).trim();
// //       if (title) segments.push({ type: 'h', level: n as 1 | 2 | 3, text: title });
// //       continue;
// //     }
// //     buf.push(line);
// //   }
// //   flushParagraph();
// //   return segments;
// // }
// // function headingFontSize(level: 1 | 2 | 3): number {
// //   if (level === 1) return 12;
// //   if (level === 2) return 10.75;
// //   return 10;
// // }
// // function buildDetailedBody(task: AiReportTask): string {
// //   const parts: string[] = [];
// //   if (task.detailedFeedback?.trim()) parts.push(task.detailedFeedback.trim());
// //   if (task.strengths?.length) {
// //     parts.push(['## Strengths', ...task.strengths.map((s) => `• ${s}`)].join('\n'));
// //   }
// //   if (task.improvements?.length) {
// //     parts.push(['## Areas for improvement', ...task.improvements.map((s) => `• ${s}`)].join('\n'));
// //   }
// //   if (task.quickTips?.length) {
// //     parts.push(['## Quick tips', ...task.quickTips.map((s) => `• ${s}`)].join('\n'));
// //   }
// //   if (task.lineFeedback?.length) {
// //     const lines = task.lineFeedback.map(
// //       (row) =>
// //         `Original: ${row.original || '—'}\nIssue: ${row.issue || '—'}\nSuggested fix: ${row.fix || '—'}`,
// //     );
// //     parts.push(['## Line-level corrections', ...lines].join('\n\n'));
// //   }
// //   if (task.modelAnswer?.trim()) {
// //     parts.push(`## Model answer (study example)\n\n${task.modelAnswer.trim()}`);
// //   }
// //   if (task.responseText?.trim()) {
// //     parts.push(`## Student submission (verbatim)\n\n${task.responseText.trim()}`);
// //   }
// //   return parts.join('\n\n—\n\n');
// // }
// // /**
// //  * Generate task-wise AI evaluation PDF — LetsCrack template (summary page + detailed page(s) per task).
// //  */
// // export const generateAiEvaluationReport = (res: Response, data: AiEvaluationReportData) => {
// //   const doc = new PDFDocument({ size: 'A4', margin: 42, bufferPages: true });
// //   doc.pipe(res);
// //   const pageWidth = 595.28;
// //   const pageHeight = 841.89;
// //   const margin = 42;
// //   const contentW = pageWidth - margin * 2;
// //   /**
// //    * Page 1 — grid, remark, 4 category boxes (template layout).
// //    */
// //   const drawSummaryPage = (task: AiReportTask) => {
// //     const tn = Number(task.taskNumber) || 1;
// //     doc.rect(0, 0, pageWidth, pageHeight).fill(LC.cream);
// //     let contentTop = drawBrandHeader(doc, pageWidth, margin, tn, false);
// //     contentTop += 12;
// //     const cellW = (contentW - 10) / 2;
// //     const cellH = 38;
// //     const row1y = contentTop;
// //     strokeRect(doc, margin, row1y, cellW, cellH);
// //     strokeRect(doc, margin + cellW + 10, row1y, cellW, cellH);
// //     strokeRect(doc, margin, row1y + cellH + 8, cellW, cellH);
// //     strokeRect(doc, margin + cellW + 10, row1y + cellH + 8, cellW, cellH);
// //     doc.font('Helvetica-Bold').fontSize(8).fillColor('#111').text('NAME:', margin + 10, row1y + 8);
// //     doc.font('Helvetica').fontSize(10).text(data.studentName || '—', margin + 10, row1y + 22, { width: cellW - 20 });
// //     doc
// //       .font('Helvetica-Bold')
// //       .fontSize(8)
// //       .text(`TASK-${tn}:`, margin + cellW + 18, row1y + 8);
// //     doc.font('Helvetica').fontSize(9).text(writingTaskSubtitle(tn), margin + cellW + 18, row1y + 20, {
// //       width: cellW - 20,
// //     });
// //     const row2y = row1y + cellH + 8;
// //     doc.font('Helvetica-Bold').fontSize(8).text('BAND SCORE:', margin + 10, row2y + 8);
// //     doc.font('Helvetica-Bold').fontSize(14).fillColor('#111').text(`${task.overallBand ?? '—'} / 6`, margin + 10, row2y + 20);
// //     doc.font('Helvetica-Bold').fontSize(8).fillColor('#111').text('AI-BASED SCORING', margin + cellW + 18, row2y + 16);
// //     const remarkTop = row2y + cellH + 14;
// //     const remarkH = 88;
// //     doc.rect(margin, remarkTop, contentW, remarkH).fill(LC.blueSoft);
// //     strokeRect(doc, margin, remarkTop, contentW, remarkH);
// //     const chipW = 72;
// //     const chipX = margin + contentW / 2 - chipW / 2;
// //     doc.rect(chipX, remarkTop - 10, chipW, 18).fill('#ffffff');
// //     strokeRect(doc, chipX, remarkTop - 10, chipW, 18);
// //     doc.font('Helvetica-Bold').fontSize(9).fillColor('#111').text('REMARK', chipX + 18, remarkTop - 6);
// //     const remarkText =
// //       task.overallRemark?.trim() ||
// //       'Overall remark will appear here once AI generates it for this submission.';
// //     doc.font('Helvetica').fontSize(9).fillColor('#111').text(remarkText, margin + 14, remarkTop + 16, {
// //       width: contentW - 28,
// //       lineGap: 2,
// //       height: Math.max(12, remarkH - 26),
// //       ellipsis: true,
// //     });
// //     const gridTop = remarkTop + remarkH + 14;
// //     const boxW = (contentW - 10) / 2;
// //     const boxH = 118;
// //     const cb = task.categoryBullets || {};
// //     const drawCategoryBox = (x: number, y: number, label: string, body: string) => {
// //       const chipLabelW = Math.min(175, boxW - 16);
// //       const lx = x + boxW / 2 - chipLabelW / 2;
// //       doc.rect(x, y, boxW, boxH).fill('#ffffff');
// //       strokeRect(doc, x, y, boxW, boxH);
// //       doc.rect(lx, y - 9, chipLabelW, 16).fill('#ffffff');
// //       strokeRect(doc, lx, y - 9, chipLabelW, 16);
// //       doc.font('Helvetica-Bold').fontSize(7).fillColor('#111').text(label, lx + 6, y - 6, { width: chipLabelW - 12 });
// //       doc.font('Helvetica').fontSize(8).fillColor('#222').text(body, x + 10, y + 14, {
// //         width: boxW - 20,
// //         lineGap: 2,
// //         height: Math.max(10, boxH - 26),
// //         ellipsis: true,
// //       });
// //     };
// //     drawWatermarkLogo(doc, pageWidth, gridTop + boxH / 2 + 20, 1.35);
// //     drawCategoryBox(margin, gridTop, 'COHERENCE/MEANING', formatCategoryBullets(cb.coherenceMeaning));
// //     drawCategoryBox(margin + boxW + 10, gridTop, 'VOCABULARY', formatCategoryBullets(cb.vocabulary));
// //     drawCategoryBox(margin, gridTop + boxH + 12, 'READABILITY', formatCategoryBullets(cb.readability));
// //     drawCategoryBox(margin + boxW + 10, gridTop + boxH + 12, 'TASK FULFILLMENT', formatCategoryBullets(cb.taskFulfillment));
// //     doc.font('Helvetica').fontSize(7).fillColor('#666').text(`Test Set #${data.testSetNumber} · Generated ${data.generatedAt}`, margin, gridTop + boxH * 2 + 32, {
// //       width: contentW,
// //       align: 'center',
// //     });
// //     drawPageFooter(doc, pageWidth, margin);
// //   };
// //   /**
// //    * Following pages — detailed feedback bar + lined area (template layout).
// //    */
// //   const drawDetailedPages = (task: AiReportTask) => {
// //     const tn = Number(task.taskNumber) || 1;
// //     const detailedText = buildDetailedBody(task).trim();
// //     const bodyFontSize = 9;
// //     const lineGap = 3;
// //     const renderOneDetailedPageChrome = (): { contentTopY: number; bottomY: number } => {
// //       doc.rect(0, 0, pageWidth, pageHeight).fill(LC.cream);
// //       const headerBottom = drawBrandHeader(doc, pageWidth, margin, tn, true) + 8;
// //       const barH = 22;
// //       doc.rect(margin, headerBottom, contentW, barH).fill(LC.blueSoft);
// //       strokeRect(doc, margin, headerBottom, contentW, barH);
// //       doc.font('Helvetica-Bold').fontSize(10).fillColor('#111').text('DETAILED FEEDBACK', margin, headerBottom + 6, {
// //         width: contentW,
// //         align: 'center',
// //       });
// //       const contentTop = headerBottom + barH + 8;
// //       const contentBottom = 772;
// //       drawLinedContentBackground(doc, margin, contentTop + 18, contentBottom - 36, contentW);
// //       drawWatermarkLogo(doc, pageWidth, (contentTop + contentBottom) / 2, 1.6);
// //       return { contentTopY: contentTop + 12, bottomY: contentBottom - 36 };
// //     };
// //     if (!detailedText) {
// //       const c = renderOneDetailedPageChrome();
// //       doc
// //         .font('Helvetica')
// //         .fontSize(10)
// //         .fillColor('#555')
// //         .text('No detailed AI feedback blocks were stored for this task.', margin, c.contentTopY, {
// //           width: contentW,
// //           height: Math.max(40, c.bottomY - c.contentTopY - 44),
// //           ellipsis: true,
// //         });
// //       drawPageFooter(doc, pageWidth, margin);
// //       return;
// //     }
// //     let segmentsQueue: DetailedSegment[] = parseDetailedFeedbackMarkdown(detailedText).filter((seg) => {
// //       if (seg.type === 'p') return seg.text.trim().length > 0;
// //       return true;
// //     });
// //     if (segmentsQueue.length === 0) {
// //       segmentsQueue = [{ type: 'p', text: stripInlineMarkdownForPdf(detailedText) }];
// //     }
// //     let firstDetailedSpread = true;
// //     /** True when continuing a sliced paragraph onto the next painted page — avoids a big faux “section gap”. */
// //     let needsTightParagraphOpen = false;
// //     /** Paint a subsection heading row (Markdown ### → typography, not literal hashes). */
// //     const paintHeadingRow = (
// //       cursorY: number,
// //       title: string,
// //       level: 1 | 2 | 3,
// //       maxWrapHeight: number,
// //     ): number => {
// //       const fs = headingFontSize(level);
// //       doc.font('Helvetica-Bold').fontSize(fs).fillColor('#0f172a');
// //       const textW = contentW - 14;
// //       const h = Math.min(doc.heightOfString(title, { width: textW, lineGap: 2 }), maxWrapHeight);
// //       doc.save();
// //       doc.fillColor(LC.blueDeep).opacity(0.92).rect(margin, cursorY + 3, 3.25, Math.max(fs + 6, h + 4)).fill();
// //       doc.restore();
// //       doc.font('Helvetica-Bold').fontSize(fs).fillColor('#0f172a');
// //       doc.text(title, margin + 10, cursorY, {
// //         width: textW,
// //         align: 'left',
// //         lineGap: 2,
// //         height: Math.max(fs + lineGap + 4, maxWrapHeight),
// //         ellipsis: true,
// //       });
// //       return cursorY + h + 10;
// //     };
// //     /** Horizontal rule separating major beats (Markdown --- / em-dash separators). */
// //     const paintRuleRow = (cursorY: number): number => {
// //       doc.save();
// //       doc.strokeColor('#cbd5e1').lineWidth(0.85).opacity(0.95);
// //       doc.moveTo(margin, cursorY + 6).lineTo(margin + contentW, cursorY + 6).stroke();
// //       doc.restore();
// //       return cursorY + 14;
// //     };
// //     while (segmentsQueue.length > 0) {
// //       if (!firstDetailedSpread) doc.addPage();
// //       firstDetailedSpread = false;
// //       const chrome = renderOneDetailedPageChrome();
// //       let yCursor = chrome.contentTopY;
// //       const zoneBottom = chrome.bottomY;
// //       let isFirstBlockOnPage = true;
// //       if (needsTightParagraphOpen && segmentsQueue[0]?.type === 'p') {
// //         yCursor += 3;
// //       }
// //       needsTightParagraphOpen = false;
// //       const slackNow = (): number => zoneBottom - yCursor - 34;
// //       const mustMoveToNextSheet = (): boolean => slackNow() < 28;
// //       let drewAnythingOnSheet = false;
// //       while (segmentsQueue.length > 0) {
// //         if (mustMoveToNextSheet()) break;
// //         const head = segmentsQueue[0];
// //         if (head.type === 'h') {
// //           const gapTop = isFirstBlockOnPage ? 2 : 8;
// //           yCursor += gapTop;
// //           const textW = contentW - 14;
// //           const fsz = headingFontSize(head.level);
// //           /** Hard cap so PDFKit never opens a phantom page mid-heading (looks like skipped / blank sheets). */
// //           let slab = Math.max(0, slackNow() - 10);
// //           const minHeadingSlab = fsz + 14;
// //           if (slab < minHeadingSlab) break;
// //           doc.font('Helvetica-Bold').fontSize(fsz);
// //           const intrinsicH = doc.heightOfString(head.text, { width: textW, lineGap: 2 });
// //           let titlePiece = head.text;
// //           if (intrinsicH <= slab * 0.93) {
// //             segmentsQueue.shift();
// //           } else {
// //             const sliced = takeTextChunk(
// //               doc,
// //               head.text,
// //               textW,
// //               Math.max(minHeadingSlab, slab - 12),
// //               fsz,
// //               2,
// //               'Helvetica-Bold',
// //             );
// //             titlePiece = sliced.chunk.trimEnd();
// //             const tail = sliced.rest.trimStart();
// //             segmentsQueue.shift();
// //             if (tail.length) segmentsQueue.unshift({ type: 'h', level: head.level, text: tail });
// //           }
// //           const wrapCap = Math.max(minHeadingSlab, slab);
// //           yCursor = paintHeadingRow(yCursor, titlePiece, head.level, wrapCap);
// //           drewAnythingOnSheet = true;
// //           isFirstBlockOnPage = false;
// //           continue;
// //         }
// //         if (head.type === 'rule') {
// //           if (slackNow() < 20) break;
// //           yCursor += isFirstBlockOnPage ? 0 : 6;
// //           yCursor = paintRuleRow(yCursor);
// //           segmentsQueue.shift();
// //           drewAnythingOnSheet = true;
// //           isFirstBlockOnPage = false;
// //           continue;
// //         }
// //         /** Paragraph streaming with height caps (avoid PDFKit auto page breaks). */
// //         let paragraph = head.text.trim();
// //         if (!paragraph) {
// //           segmentsQueue.shift();
// //           continue;
// //         }
// //         let slack = slackNow();
// //         const { chunk, rest } = takeTextChunk(doc, paragraph, contentW, Math.max(16, slack - 14), bodyFontSize, lineGap);
// //         let bodyBlock = chunk;
// //         if (!bodyBlock.length && paragraph.length > 0) {
// //           /** Hard advance when layout math jams (should be rare). */
// //           bodyBlock = [...paragraph][0] ?? '';
// //           paragraph = [...paragraph].slice(1).join('').trimStart();
// //         }
// //         if (!bodyBlock.length) {
// //           segmentsQueue.shift();
// //           continue;
// //         }
// //         doc.font('Helvetica').fontSize(bodyFontSize).fillColor('#1e293b');
// //         slack = slackNow();
// //         const blockSlack = Math.max(16, slack - 14);
// //         if (blockSlack < 20) break;
// //         const paraLead = isFirstBlockOnPage ? 0 : 10;
// //         doc.text(bodyBlock, margin, yCursor + paraLead, {
// //           width: contentW,
// //           align: 'left',
// //           lineGap,
// //           height: blockSlack,
// //         });
// //         const naturalH = doc.heightOfString(bodyBlock, { width: contentW, lineGap });
// //         yCursor += paraLead + Math.min(naturalH, blockSlack) + 12;
// //         isFirstBlockOnPage = false;
// //         if (rest.length) segmentsQueue[0] = { type: 'p', text: rest };
// //         else segmentsQueue.shift();
// //         drewAnythingOnSheet = true;
// //       }
// //       /** Tight continuation only after we laid down real copy (avoid stray blank sheets). */
// //       needsTightParagraphOpen =
// //         drewAnythingOnSheet && segmentsQueue.length > 0 && segmentsQueue[0].type === 'p';
// //       doc.font('Helvetica').fontSize(bodyFontSize).fillColor('#111111');
// //       drawPageFooter(doc, pageWidth, margin);
// //     }
// //   };
// //   if (!data.tasks.length) {
// //     doc.rect(0, 0, pageWidth, pageHeight).fill(LC.cream);
// //     doc.font('Times-Bold').fontSize(14).fillColor('#111').text("LET'S CRACK ENGLISH — AI REPORT", margin, 80, {
// //       width: contentW,
// //       align: 'center',
// //     });
// //     doc.font('Helvetica').fontSize(11).text('No task-wise AI writing data available yet.', margin, 120, { width: contentW });
// //     drawPageFooter(doc, pageWidth, margin);
// //     doc.end();
// //     logger.info(`AI evaluation PDF generated for ${data.studentName} (empty tasks)`);
// //     return;
// //   }
// //   const sortedTasks = [...data.tasks].sort((a, b) => Number(a.taskNumber) - Number(b.taskNumber));
// //   sortedTasks.forEach((task, idx) => {
// //     if (idx > 0) doc.addPage();
// //     drawSummaryPage(task);
// //     doc.addPage();
// //     drawDetailedPages(task);
// //   });
// //   const range = doc.bufferedPageRange();
// //   for (let i = range.start; i < range.start + range.count; i++) {
// //     doc.switchToPage(i);
// //     doc.save();
// //     doc.font('Helvetica').fontSize(7).fillColor('#999999');
// //     doc.text(`Page ${i - range.start + 1} of ${range.count}`, margin, 820, {
// //       align: 'right',
// //       width: contentW,
// //     });
// //     doc.restore();
// //   }
// //   doc.end();
// //   logger.info(`AI evaluation PDF generated (LetsCrack template) for ${data.studentName}`);
// // };
// // export default { generateCertificate, generateAiEvaluationReport };
// import PDFDocument from 'pdfkit';
// import { Response } from 'express';
// import logger from '../utils/logger.js';
// interface CertificateData {
//   studentName: string;
//   testSetNumber: number;
//   writingBand: string;
//   speakingBand: string;
//   overallBand: string;
//   date: string;
// }
// interface AiReportTask {
//   taskNumber: number;
//   responseText?: string;
//   wordCount?: number;
//   overallBand?: number | string;
//   coherence?: number | string;
//   vocabulary?: number | string;
//   readability?: number | string;
//   taskFulfillment?: number | string;
//   taskAchievement?: number | string;
//   coherenceCohesion?: number | string;
//   lexicalResource?: number | string;
//   grammar?: number | string;
//   overallRemark?: string;
//   detailedFeedback?: string;
//   categoryBullets?: {
//     coherenceMeaning?: string[];
//     vocabulary?: string[];
//     readability?: string[];
//     taskFulfillment?: string[];
//   };
//   strengths?: string[];
//   improvements?: string[];
//   quickTips?: string[];
//   lineFeedback?: Array<{ original?: string; issue?: string; fix?: string }>;
//   modelAnswer?: string;
// }
// interface AiEvaluationReportData {
//   studentName: string;
//   testSetNumber: number;
//   generatedAt: string;
//   overallBand?: string | number;
//   writingBand?: string | number;
//   tasks: AiReportTask[];
// }
// /**
//  * Generates a formal CELPIP Practice Certificate as a PDF stream
//  * 
//  * @param res - The Express response object to stream the PDF to
//  * @param data - The student's score and band details
//  */
// export const generateCertificate = (res: Response, data: CertificateData) => {
//   const doc = new PDFDocument({ margin: 50, size: 'A4' });
//   // Stream directly to the response
//   doc.pipe(res);
//   // --- Header ---
//   doc.fillColor('#1B3A6B')
//      .fontSize(25)
//      .text("LET'S CRACK ENGLISH", { align: 'center' });
//   doc.fontSize(15)
//      .text('CELPIP Practice Platform - Statement of Results', { align: 'center' });
//   doc.moveDown(2);
//   // --- Border ---
//   doc.rect(20, 20, 555, 782).stroke();
//   // --- Recipient Info ---
//   doc.fillColor('#000000')
//      .fontSize(12)
//      .text('This is to certify that:', { align: 'left' });
//   doc.fontSize(20)
//      .text(data.studentName, { align: 'left', underline: true });
//   doc.moveDown();
//   doc.fontSize(12)
//      .text(`has successfully completed CELPIP Practice Test Set ${data.testSetNumber} on ${data.date}.`);
//   doc.moveDown(2);
//   // --- Scores Table ---
//   doc.fontSize(16)
//      .fillColor('#1B3A6B')
//      .text('Skill Performance Report', { underline: true });
//   doc.moveDown();
//   const drawRow = (label: string, band: string, y: number) => {
//     doc.fillColor('#000000').fontSize(12).text(label, 70, y);
//     doc.fillColor('#2563EB').fontSize(14).text(`CLB Band: ${band}`, 300, y);
//   };
//   let currentY = doc.y;
//   drawRow('Writing Module', data.writingBand || 'N/A', currentY);
//   currentY += 30;
//   drawRow('Speaking Module', data.speakingBand || 'N/A', currentY);
//   currentY += 30;
//   doc.rect(50, currentY, 495, 2).fill('#1B3A6B'); // Horizontal line
//   currentY += 15;
//   doc.fillColor('#1B3A6B')
//      .fontSize(16)
//      .text('Overall CELPIP Level', 70, currentY);
//   doc.fontSize(20)
//      .font('Helvetica-Bold')
//      .text(data.overallBand, 300, currentY);
//   // --- Footer ---
//   doc.moveDown(5);
//   doc.fontSize(10)
//      .fillColor('#777777')
//      .text('Note: This is an unofficial practice report for educational purposes only.', { align: 'center' });
//   doc.text(`Certificate ID: LCE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, { align: 'center' });
//   // Finalize the PDF
//   doc.end();
//   logger.info(`Certificate generated and streamed for ${data.studentName}`);
// };
// /** LetsCrack English — AI Writing report visual system (matches brand PDF templates). */
// const LC = {
//   cream: '#FAF8F5',
//   blueSoft: '#C5E8F7',
//   blueDeep: '#1E88B0',
//   blueBrand: '#2E86AB',
//   border: '#1a1a1a',
//   footerUrl: 'WWW.LETSCRACKENGLISH.COM',
// };
// function writingTaskSubtitle(taskNumber: number): string {
//   return taskNumber === 1 ? 'WRITING AN EMAIL' : 'RESPONDING TO SURVEY QUESTIONS';
// }
// function formatCategoryBullets(items: string[] | undefined): string {
//   if (!items?.length) return '—';
//   return items.slice(0, 4).map((s) => `• ${s}`).join('\n');
// }
// /** Four-petal logo (approximation of brand mark). */
// function drawLetsCrackLogo(doc: InstanceType<typeof PDFDocument>, cx: number, cy: number, petalR: number, color: string) {
//   doc.save();
//   doc.fillColor(color);
//   const d = petalR * 1.05;
//   doc.circle(cx, cy - d, petalR).fill();
//   doc.circle(cx, cy + d, petalR).fill();
//   doc.circle(cx - d, cy, petalR).fill();
//   doc.circle(cx + d, cy, petalR).fill();
//   doc.restore();
// }
// function drawBrandHeader(
//   doc: InstanceType<typeof PDFDocument>,
//   pageWidth: number,
//   margin: number,
//   taskNumber: number,
//   withSubtitle: boolean,
// ) {
//   const cx = pageWidth / 2;
//   const yStart = 38;
//   drawLetsCrackLogo(doc, cx, yStart + 10, 7, LC.blueDeep);
//   doc
//     .font('Helvetica-Bold')
//     .fontSize(9)
//     .fillColor(LC.blueBrand)
//     .text("LET'S CRACK ENGLISH", margin, yStart + 28, {
//       align: 'center',
//       width: pageWidth - margin * 2,
//     });
//   doc
//     .font('Times-Bold')
//     .fontSize(18)
//     .fillColor('#111111')
//     .text(`WRITING TASK-${taskNumber} REPORT`, margin, yStart + 42, {
//       align: 'center',
//       width: pageWidth - margin * 2,
//     });
//   if (withSubtitle) {
//     doc
//       .font('Times-Bold')
//       .fontSize(11)
//       .fillColor('#111111')
//       .text(`(${writingTaskSubtitle(taskNumber)})`, margin, yStart + 62, {
//         align: 'center',
//         width: pageWidth - margin * 2,
//       });
//     return yStart + 82;
//   }
//   return yStart + 72;
// }
// function strokeRect(doc: InstanceType<typeof PDFDocument>, x: number, y: number, w: number, h: number) {
//   doc.save();
//   doc.lineWidth(0.65).strokeColor(LC.border);
//   doc.rect(x, y, w, h).stroke();
//   doc.restore();
// }
// function drawPageFooter(doc: InstanceType<typeof PDFDocument>, pageWidth: number, margin: number) {
//   doc.save();
//   doc.font('Helvetica').fontSize(8).fillColor('#333333');
//   doc.fillColor('#333333').text(LC.footerUrl, margin, 805, {
//     width: pageWidth - margin * 2,
//     align: 'center',
//   });
//   doc.restore();
// }
// function drawWatermarkLogo(
//   doc: InstanceType<typeof PDFDocument>,
//   pageWidth: number,
//   midY: number,
//   scale: number,
// ) {
//   doc.save();
//   doc.opacity(0.05);
//   drawLetsCrackLogo(doc, pageWidth / 2, midY, 28 * scale, LC.blueDeep);
//   doc.restore();
// }
// function drawLinedContentBackground(
//   doc: InstanceType<typeof PDFDocument>,
//   margin: number,
//   y0: number,
//   y1: number,
//   contentW: number,
// ) {
//   doc.save();
//   doc.strokeColor('#d8d8d8').lineWidth(0.3).opacity(0.38);
//   const lineGap = 16;
//   for (let y = y0; y < y1; y += lineGap) {
//     doc.moveTo(margin, y).lineTo(margin + contentW, y).stroke();
//   }
//   doc.restore();
// }
// /** Split plain text so the first slice fits vertically at the given width (PDFKit). */
// function takeTextChunk(
//   doc: InstanceType<typeof PDFDocument>,
//   text: string,
//   width: number,
//   maxHeight: number,
//   fontSize: number,
//   lineGap: number,
//   fontFace: 'Helvetica' | 'Helvetica-Bold' = 'Helvetica',
// ): { chunk: string; rest: string } {
//   const t = text.trimStart();
//   if (!t) return { chunk: '', rest: '' };
//   /** PDFKit can lay out slightly taller than heightOfString; stay under ceiling. */
//   const budget = Math.max(14, maxHeight * 0.96);
//   doc.font(fontFace).fontSize(fontSize);
//   const opts = { width, lineGap } as const;
//   const hFull = doc.heightOfString(t, opts);
//   if (hFull <= budget) return { chunk: t, rest: '' };
//   let lo = 1;
//   let hi = t.length;
//   let best = 1;
//   while (lo <= hi) {
//     const mid = (lo + hi) >> 1;
//     const h = doc.heightOfString(t.slice(0, mid), opts);
//     if (h <= budget) {
//       best = mid;
//       lo = mid + 1;
//     } else hi = mid - 1;
//   }
//   let cut = best;
//   const br = t.lastIndexOf('\n\n', cut);
//   const paragraphBreak = br >= 0 ? br + 2 : -1;
//   const sp = t.lastIndexOf(' ', cut);
//   const softBreak = sp >= 40 ? sp + 1 : -1;
//   const preferNice = paragraphBreak >= 40 ? paragraphBreak : softBreak;
//   if (preferNice >= 40 && preferNice <= cut && doc.heightOfString(t.slice(0, preferNice), opts) <= budget) {
//     cut = preferNice;
//   }
//   let chunk = t.slice(0, cut).trimEnd();
//   /** Never return empty chunk when there is remainder (prevents footer-only filler pages). */
//   if (!chunk.length) {
//     const first = [...t][0] ?? '';
//     const restChars = [...t].slice(1).join('');
//     return { chunk: first, rest: restChars.trimStart() };
//   }
//   const rest = t.slice(cut).trimStart();
//   /** If trimming removed trailing newlines/spaces inside [0,cut), same rest stays valid. */
//   return { chunk, rest };
// }
// /** Strip lightweight markdown noise from paragraph copy (PDF has no Markdown engine). */
// function stripInlineMarkdownForPdf(s: string): string {
//   return s
//     .replace(/\*\*([^*]+)\*\*/g, '$1')
//     .replace(/__([^_]+)__/g, '$1')
//     .replace(/\*([^*]+)\*/g, '$1')
//     .replace(/_([^_]+)_/g, '$1')
//     .replace(/`{1,3}([^`]+)`{1,3}/g, '$1')
//     .replace(/^[-*+]\s+/gm, '• ')
//     .replace(/^\s*#{1,6}\s+/gm, '');
// }
// type DetailedSegment =
//   | { type: 'h'; level: 1 | 2 | 3; text: string }
//   | { type: 'rule' }
//   | { type: 'p'; text: string };
// /** Turn AI markdown-ish feedback into drawable segments with real headings (no "###" glyphs). */
// function parseDetailedFeedbackMarkdown(full: string): DetailedSegment[] {
//   const text = full.replace(/\r\n/g, '\n').trim();
//   const lines = text.split('\n');
//   const segments: DetailedSegment[] = [];
//   let buf: string[] = [];
//   const flushParagraph = () => {
//     const raw = buf.join('\n').trim();
//     buf = [];
//     if (!raw) return;
//     segments.push({ type: 'p', text: stripInlineMarkdownForPdf(raw) });
//   };
//   const H_RE = /^\s{0,3}(#{1,6})\s*(.+?)\s*$/;
//   const RULE_RE = /^\s*(?:[-*_]\s*){3,}\s*$/;
//   const EM_DASH_RULE = /^\s*[—\-=]{3,}\s*$/;
//   for (const line of lines) {
//     if (!line.trim()) {
//       flushParagraph();
//       continue;
//     }
//     if (RULE_RE.test(line) || EM_DASH_RULE.test(line)) {
//       flushParagraph();
//       segments.push({ type: 'rule' });
//       continue;
//     }
//     const hm = H_RE.exec(line);
//     if (hm) {
//       flushParagraph();
//       const n = Math.min(3, Math.max(1, hm[1].length));
//       const title = stripInlineMarkdownForPdf(hm[2]).trim();
//       if (title) segments.push({ type: 'h', level: n as 1 | 2 | 3, text: title });
//       continue;
//     }
//     buf.push(line);
//   }
//   flushParagraph();
//   return segments;
// }
// function headingFontSize(level: 1 | 2 | 3): number {
//   if (level === 1) return 12;
//   if (level === 2) return 10.75;
//   return 10;
// }
// function buildDetailedBody(task: AiReportTask): string {
//   const parts: string[] = [];
//   if (task.detailedFeedback?.trim()) parts.push(task.detailedFeedback.trim());
//   if (task.strengths?.length) {
//     parts.push(['## Strengths', ...task.strengths.map((s) => `• ${s}`)].join('\n'));
//   }
//   if (task.improvements?.length) {
//     parts.push(['## Areas for improvement', ...task.improvements.map((s) => `• ${s}`)].join('\n'));
//   }
//   if (task.quickTips?.length) {
//     parts.push(['## Quick tips', ...task.quickTips.map((s) => `• ${s}`)].join('\n'));
//   }
//   if (task.lineFeedback?.length) {
//     const lines = task.lineFeedback.map(
//       (row) =>
//         `Original: ${row.original || '—'}\nIssue: ${row.issue || '—'}\nSuggested fix: ${row.fix || '—'}`,
//     );
//     parts.push(['## Line-level corrections', ...lines].join('\n\n'));
//   }
//   if (task.modelAnswer?.trim()) {
//     parts.push(`## Model answer (study example)\n\n${task.modelAnswer.trim()}`);
//   }
//   if (task.responseText?.trim()) {
//     parts.push(`## Student submission (verbatim)\n\n${task.responseText.trim()}`);
//   }
//   return parts.join('\n\n—\n\n');
// }
// /**
//  * Generate task-wise AI evaluation PDF — LetsCrack template (summary page + detailed page(s) per task).
//  * ✅ FIXED: Prevents blank page gaps with improved page creation logic
//  */
// export const generateAiEvaluationReport = (res: Response, data: AiEvaluationReportData) => {
//   const doc = new PDFDocument({ size: 'A4', margin: 42, bufferPages: true });
//   doc.pipe(res);
//   const pageWidth = 595.28;
//   const pageHeight = 841.89;
//   const margin = 42;
//   const contentW = pageWidth - margin * 2;
//   /**
//    * Page 1 — grid, remark, 4 category boxes (template layout).
//    */
//   const drawSummaryPage = (task: AiReportTask) => {
//     const tn = Number(task.taskNumber) || 1;
//     doc.rect(0, 0, pageWidth, pageHeight).fill(LC.cream);
//     let contentTop = drawBrandHeader(doc, pageWidth, margin, tn, false);
//     contentTop += 12;
//     const cellW = (contentW - 10) / 2;
//     const cellH = 38;
//     const row1y = contentTop;
//     strokeRect(doc, margin, row1y, cellW, cellH);
//     strokeRect(doc, margin + cellW + 10, row1y, cellW, cellH);
//     strokeRect(doc, margin, row1y + cellH + 8, cellW, cellH);
//     strokeRect(doc, margin + cellW + 10, row1y + cellH + 8, cellW, cellH);
//     doc.font('Helvetica-Bold').fontSize(8).fillColor('#111').text('NAME:', margin + 10, row1y + 8);
//     doc.font('Helvetica').fontSize(10).text(data.studentName || '—', margin + 10, row1y + 22, { width: cellW - 20 });
//     doc
//       .font('Helvetica-Bold')
//       .fontSize(8)
//       .text(`TASK-${tn}:`, margin + cellW + 18, row1y + 8);
//     doc.font('Helvetica').fontSize(9).text(writingTaskSubtitle(tn), margin + cellW + 18, row1y + 20, {
//       width: cellW - 20,
//     });
//     const row2y = row1y + cellH + 8;
//     doc.font('Helvetica-Bold').fontSize(8).text('BAND SCORE:', margin + 10, row2y + 8);
//     doc.font('Helvetica-Bold').fontSize(14).fillColor('#111').text(`${task.overallBand ?? '—'} / 6`, margin + 10, row2y + 20);
//     doc.font('Helvetica-Bold').fontSize(8).fillColor('#111').text('AI-BASED SCORING', margin + cellW + 18, row2y + 16);
//     const remarkTop = row2y + cellH + 14;
//     const remarkH = 88;
//     doc.rect(margin, remarkTop, contentW, remarkH).fill(LC.blueSoft);
//     strokeRect(doc, margin, remarkTop, contentW, remarkH);
//     const chipW = 72;
//     const chipX = margin + contentW / 2 - chipW / 2;
//     doc.rect(chipX, remarkTop - 10, chipW, 18).fill('#ffffff');
//     strokeRect(doc, chipX, remarkTop - 10, chipW, 18);
//     doc.font('Helvetica-Bold').fontSize(9).fillColor('#111').text('REMARK', chipX + 18, remarkTop - 6);
//     const remarkText =
//       task.overallRemark?.trim() ||
//       'Overall remark will appear here once AI generates it for this submission.';
//     doc.font('Helvetica').fontSize(9).fillColor('#111').text(remarkText, margin + 14, remarkTop + 16, {
//       width: contentW - 28,
//       lineGap: 2,
//       height: Math.max(12, remarkH - 26),
//       ellipsis: true,
//     });
//     const gridTop = remarkTop + remarkH + 14;
//     const boxW = (contentW - 10) / 2;
//     const boxH = 118;
//     const cb = task.categoryBullets || {};
//     const drawCategoryBox = (x: number, y: number, label: string, body: string) => {
//       const chipLabelW = Math.min(175, boxW - 16);
//       const lx = x + boxW / 2 - chipLabelW / 2;
//       doc.rect(x, y, boxW, boxH).fill('#ffffff');
//       strokeRect(doc, x, y, boxW, boxH);
//       doc.rect(lx, y - 9, chipLabelW, 16).fill('#ffffff');
//       strokeRect(doc, lx, y - 9, chipLabelW, 16);
//       doc.font('Helvetica-Bold').fontSize(7).fillColor('#111').text(label, lx + 6, y - 6, { width: chipLabelW - 12 });
//       doc.font('Helvetica').fontSize(8).fillColor('#222').text(body, x + 10, y + 14, {
//         width: boxW - 20,
//         lineGap: 2,
//         height: Math.max(10, boxH - 26),
//         ellipsis: true,
//       });
//     };
//     drawWatermarkLogo(doc, pageWidth, gridTop + boxH / 2 + 20, 1.35);
//     drawCategoryBox(margin, gridTop, 'COHERENCE/MEANING', formatCategoryBullets(cb.coherenceMeaning));
//     drawCategoryBox(margin + boxW + 10, gridTop, 'VOCABULARY', formatCategoryBullets(cb.vocabulary));
//     drawCategoryBox(margin, gridTop + boxH + 12, 'READABILITY', formatCategoryBullets(cb.readability));
//     drawCategoryBox(margin + boxW + 10, gridTop + boxH + 12, 'TASK FULFILLMENT', formatCategoryBullets(cb.taskFulfillment));
//     doc.font('Helvetica').fontSize(7).fillColor('#666').text(`Test Set #${data.testSetNumber} · Generated ${data.generatedAt}`, margin, gridTop + boxH * 2 + 32, {
//       width: contentW,
//       align: 'center',
//     });
//     drawPageFooter(doc, pageWidth, margin);
//   };
//   /**
//    * Following pages — detailed feedback bar + lined area (template layout).
//    * ✅ FIXED: Improved blank page prevention
//    */
//   const drawDetailedPages = (task: AiReportTask) => {
//     const tn = Number(task.taskNumber) || 1;
//     const detailedText = buildDetailedBody(task).trim();
//     const bodyFontSize = 9;
//     const lineGap = 3;
//     const renderOneDetailedPageChrome = (): { contentTopY: number; bottomY: number } => {
//       doc.rect(0, 0, pageWidth, pageHeight).fill(LC.cream);
//       const headerBottom = drawBrandHeader(doc, pageWidth, margin, tn, true) + 8;
//       const barH = 22;
//       doc.rect(margin, headerBottom, contentW, barH).fill(LC.blueSoft);
//       strokeRect(doc, margin, headerBottom, contentW, barH);
//       doc.font('Helvetica-Bold').fontSize(10).fillColor('#111').text('DETAILED FEEDBACK', margin, headerBottom + 6, {
//         width: contentW,
//         align: 'center',
//       });
//       const contentTop = headerBottom + barH + 8;
//       const contentBottom = 772;
//       drawLinedContentBackground(doc, margin, contentTop + 18, contentBottom - 36, contentW);
//       drawWatermarkLogo(doc, pageWidth, (contentTop + contentBottom) / 2, 1.6);
//       return { contentTopY: contentTop + 12, bottomY: contentBottom - 36 };
//     };
//     if (!detailedText) {
//       const c = renderOneDetailedPageChrome();
//       doc
//         .font('Helvetica')
//         .fontSize(10)
//         .fillColor('#555')
//         .text('No detailed AI feedback blocks were stored for this task.', margin, c.contentTopY, {
//           width: contentW,
//           height: Math.max(40, c.bottomY - c.contentTopY - 44),
//           ellipsis: true,
//         });
//       drawPageFooter(doc, pageWidth, margin);
//       return;
//     }
//     let segmentsQueue: DetailedSegment[] = parseDetailedFeedbackMarkdown(detailedText).filter((seg) => {
//       if (seg.type === 'p') return seg.text.trim().length > 0;
//       return true;
//     });
//     if (segmentsQueue.length === 0) {
//       segmentsQueue = [{ type: 'p', text: stripInlineMarkdownForPdf(detailedText) }];
//     }
//     let firstDetailedSpread = true;
//     let needsTightParagraphOpen = false;
//     // ✅ FIX #1: Track if previous page had content
//     let previousPageHadContent = false;
//     /** Paint a subsection heading row (Markdown ### → typography, not literal hashes). */
//     const paintHeadingRow = (
//       cursorY: number,
//       title: string,
//       level: 1 | 2 | 3,
//       maxWrapHeight: number,
//     ): number => {
//       const fs = headingFontSize(level);
//       doc.font('Helvetica-Bold').fontSize(fs).fillColor('#0f172a');
//       const textW = contentW - 14;
//       const h = Math.min(doc.heightOfString(title, { width: textW, lineGap: 2 }), maxWrapHeight);
//       doc.save();
//       doc.fillColor(LC.blueDeep).opacity(0.92).rect(margin, cursorY + 3, 3.25, Math.max(fs + 6, h + 4)).fill();
//       doc.restore();
//       doc.font('Helvetica-Bold').fontSize(fs).fillColor('#0f172a');
//       doc.text(title, margin + 10, cursorY, {
//         width: textW,
//         align: 'left',
//         lineGap: 2,
//         height: Math.max(fs + lineGap + 4, maxWrapHeight),
//         ellipsis: true,
//       });
//       return cursorY + h + 10;
//     };
//     /** Horizontal rule separating major beats (Markdown --- / em-dash separators). */
//     const paintRuleRow = (cursorY: number): number => {
//       doc.save();
//       doc.strokeColor('#cbd5e1').lineWidth(0.85).opacity(0.95);
//       doc.moveTo(margin, cursorY + 6).lineTo(margin + contentW, cursorY + 6).stroke();
//       doc.restore();
//       return cursorY + 14;
//     };
//     while (segmentsQueue.length > 0) {
//       // ✅ FIX #2: Only add page if previous page had content
//       if (!firstDetailedSpread && previousPageHadContent) {
//         doc.addPage();
//       }
//       firstDetailedSpread = false;
//       const chrome = renderOneDetailedPageChrome();
//       let yCursor = chrome.contentTopY;
//       const zoneBottom = chrome.bottomY;
//       let isFirstBlockOnPage = true;
//       if (needsTightParagraphOpen && segmentsQueue[0]?.type === 'p') {
//         yCursor += 3;
//       }
//       needsTightParagraphOpen = false;
//       const slackNow = (): number => zoneBottom - yCursor - 34;
//       const mustMoveToNextSheet = (): boolean => slackNow() < 28;
//       let drewAnythingOnSheet = false;
//       while (segmentsQueue.length > 0) {
//         if (mustMoveToNextSheet()) break;
//         const head = segmentsQueue[0];
//         if (head.type === 'h') {
//           const gapTop = isFirstBlockOnPage ? 2 : 8;
//           yCursor += gapTop;
//           const textW = contentW - 14;
//           const fsz = headingFontSize(head.level);
//           // ✅ FIX #3: Reduce minimum heading slack requirement
//           let slab = Math.max(0, slackNow() - 10);
//           const minHeadingSlab = fsz + 8; // Changed from fsz + 14
//           if (slab < minHeadingSlab) break;
//           doc.font('Helvetica-Bold').fontSize(fsz);
//           const intrinsicH = doc.heightOfString(head.text, { width: textW, lineGap: 2 });
//           let titlePiece = head.text;
//           if (intrinsicH <= slab * 0.93) {
//             segmentsQueue.shift();
//           } else {
//             const sliced = takeTextChunk(
//               doc,
//               head.text,
//               textW,
//               Math.max(minHeadingSlab, slab - 12),
//               fsz,
//               2,
//               'Helvetica-Bold',
//             );
//             titlePiece = sliced.chunk.trimEnd();
//             const tail = sliced.rest.trimStart();
//             segmentsQueue.shift();
//             if (tail.length) segmentsQueue.unshift({ type: 'h', level: head.level, text: tail });
//           }
//           const wrapCap = Math.max(minHeadingSlab, slab);
//           yCursor = paintHeadingRow(yCursor, titlePiece, head.level, wrapCap);
//           drewAnythingOnSheet = true;
//           isFirstBlockOnPage = false;
//           continue;
//         }
//         if (head.type === 'rule') {
//           if (slackNow() < 20) break;
//           yCursor += isFirstBlockOnPage ? 0 : 6;
//           yCursor = paintRuleRow(yCursor);
//           segmentsQueue.shift();
//           drewAnythingOnSheet = true;
//           isFirstBlockOnPage = false;
//           continue;
//         }
//         /** Paragraph streaming with height caps (avoid PDFKit auto page breaks). */
//         let paragraph = head.text.trim();
//         if (!paragraph) {
//           segmentsQueue.shift();
//           continue;
//         }
//         let slack = slackNow();
//         const { chunk, rest } = takeTextChunk(doc, paragraph, contentW, Math.max(16, slack - 14), bodyFontSize, lineGap);
//         let bodyBlock = chunk;
//         if (!bodyBlock.length && paragraph.length > 0) {
//           /** Hard advance when layout math jams (should be rare). */
//           bodyBlock = [...paragraph][0] ?? '';
//           paragraph = [...paragraph].slice(1).join('').trimStart();
//         }
//         if (!bodyBlock.length) {
//           segmentsQueue.shift();
//           continue;
//         }
//         doc.font('Helvetica').fontSize(bodyFontSize).fillColor('#1e293b');
//         slack = slackNow();
//         const blockSlack = Math.max(16, slack - 14);
//         // ✅ FIX #4: Reduce minimum paragraph slack requirement
//         if (blockSlack < 12) break; // Changed from 20 to 12
//         const paraLead = isFirstBlockOnPage ? 0 : 10;
//         doc.text(bodyBlock, margin, yCursor + paraLead, {
//           width: contentW,
//           align: 'left',
//           lineGap,
//           height: blockSlack,
//         });
//         const naturalH = doc.heightOfString(bodyBlock, { width: contentW, lineGap });
//         yCursor += paraLead + Math.min(naturalH, blockSlack) + 12;
//         isFirstBlockOnPage = false;
//         if (rest.length) segmentsQueue[0] = { type: 'p', text: rest };
//         else segmentsQueue.shift();
//         drewAnythingOnSheet = true;
//       }
//       // ✅ FIX #5: Update previous page state for next iteration
//       previousPageHadContent = drewAnythingOnSheet;
//       /** Tight continuation only after we laid down real copy (avoid stray blank sheets). */
//       needsTightParagraphOpen =
//         drewAnythingOnSheet && segmentsQueue.length > 0 && segmentsQueue[0].type === 'p';
//       doc.font('Helvetica').fontSize(bodyFontSize).fillColor('#111111');
//       drawPageFooter(doc, pageWidth, margin);
//     }
//   };
//   if (!data.tasks.length) {
//     doc.rect(0, 0, pageWidth, pageHeight).fill(LC.cream);
//     doc.font('Times-Bold').fontSize(14).fillColor('#111').text("LET'S CRACK ENGLISH — AI REPORT", margin, 80, {
//       width: contentW,
//       align: 'center',
//     });
//     doc.font('Helvetica').fontSize(11).text('No task-wise AI writing data available yet.', margin, 120, { width: contentW });
//     drawPageFooter(doc, pageWidth, margin);
//     doc.end();
//     logger.info(`AI evaluation PDF generated for ${data.studentName} (empty tasks)`);
//     return;
//   }
//   const sortedTasks = [...data.tasks].sort((a, b) => Number(a.taskNumber) - Number(b.taskNumber));
//   sortedTasks.forEach((task, idx) => {
//     if (idx > 0) doc.addPage();
//     drawSummaryPage(task);
//     doc.addPage();
//     drawDetailedPages(task);
//   });
//   const range = doc.bufferedPageRange();
//   for (let i = range.start; i < range.start + range.count; i++) {
//     doc.switchToPage(i);
//     doc.save();
//     doc.font('Helvetica').fontSize(7).fillColor('#999999');
//     doc.text(`Page ${i - range.start + 1} of ${range.count}`, margin, 820, {
//       align: 'right',
//       width: contentW,
//     });
//     doc.restore();
//   }
//   doc.end();
//   logger.info(`AI evaluation PDF generated (LetsCrack template) for ${data.studentName}`);
// };
// export default { generateCertificate, generateAiEvaluationReport };
import PDFDocument from 'pdfkit';
import logger from '../utils/logger.js';
/**
 * Generates a formal CELPIP Practice Certificate as a PDF stream
 *
 * @param res - The Express response object to stream the PDF to
 * @param data - The student's score and band details
 */
export const generateCertificate = (res, data) => {
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
    const drawRow = (label, band, y) => {
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
/** LetsCrack English — AI Writing report visual system (matches brand PDF templates). */
const LC = {
    cream: '#FAF8F5',
    blueSoft: '#C5E8F7',
    blueDeep: '#1E88B0',
    blueBrand: '#2E86AB',
    border: '#1a1a1a',
    footerUrl: 'WWW.LETSCRACKENGLISH.COM',
};
function writingTaskSubtitle(taskNumber) {
    return taskNumber === 1 ? 'WRITING AN EMAIL' : 'RESPONDING TO SURVEY QUESTIONS';
}
function formatCategoryBullets(items) {
    if (!items?.length)
        return '—';
    return items.slice(0, 4).map((s) => `• ${s}`).join('\n');
}
/** Four-petal logo (approximation of brand mark). */
function drawLetsCrackLogo(doc, cx, cy, petalR, color) {
    doc.save();
    doc.fillColor(color);
    const d = petalR * 1.05;
    doc.circle(cx, cy - d, petalR).fill();
    doc.circle(cx, cy + d, petalR).fill();
    doc.circle(cx - d, cy, petalR).fill();
    doc.circle(cx + d, cy, petalR).fill();
    doc.restore();
}
function drawBrandHeader(doc, pageWidth, margin, taskNumber, withSubtitle) {
    const cx = pageWidth / 2;
    const yStart = 38;
    drawLetsCrackLogo(doc, cx, yStart + 10, 7, LC.blueDeep);
    const w = pageWidth - margin * 2;
    doc
        .font('Helvetica-Bold')
        .fontSize(9)
        .fillColor(LC.blueBrand)
        .text("LET'S CRACK ENGLISH", margin, yStart + 28, {
        align: 'center',
        width: w,
        height: 14,
        ellipsis: true,
    });
    doc
        .font('Times-Bold')
        .fontSize(18)
        .fillColor('#111111')
        .text(`WRITING TASK-${taskNumber} REPORT`, margin, yStart + 42, {
        align: 'center',
        width: w,
        height: 26,
        ellipsis: true,
    });
    if (withSubtitle) {
        doc
            .font('Times-Bold')
            .fontSize(11)
            .fillColor('#111111')
            .text(`(${writingTaskSubtitle(taskNumber)})`, margin, yStart + 62, {
            align: 'center',
            width: w,
            height: 18,
            ellipsis: true,
        });
        return yStart + 82;
    }
    return yStart + 72;
}
function strokeRect(doc, x, y, w, h) {
    doc.save();
    doc.lineWidth(0.65).strokeColor(LC.border);
    doc.rect(x, y, w, h).stroke();
    doc.restore();
}
function drawPageFooter(doc, pageWidth, margin) {
    doc.save();
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.fillColor('#333333').text(LC.footerUrl, margin, 805, {
        width: pageWidth - margin * 2,
        align: 'center',
    });
    doc.restore();
}
function drawWatermarkLogo(doc, pageWidth, midY, scale) {
    doc.save();
    doc.opacity(0.05);
    drawLetsCrackLogo(doc, pageWidth / 2, midY, 28 * scale, LC.blueDeep);
    doc.restore();
}
function drawLinedContentBackground(doc, margin, y0, y1, contentW) {
    doc.save();
    doc.strokeColor('#d8d8d8').lineWidth(0.3).opacity(0.38);
    const lineGap = 16;
    for (let y = y0; y < y1; y += lineGap) {
        doc.moveTo(margin, y).lineTo(margin + contentW, y).stroke();
    }
    doc.restore();
}
/** Split plain text so the first slice fits vertically at the given width (PDFKit). */
function takeTextChunk(doc, text, width, maxHeight, fontSize, lineGap, fontFace = 'Helvetica') {
    const t = text.trimStart();
    if (!t)
        return { chunk: '', rest: '' };
    /** Align with doc.text(+height:) – too conservative a budget ⇒ tiny chunks ⇒ huge page counts */
    const budget = Math.max(14, maxHeight * 0.985);
    doc.font(fontFace).fontSize(fontSize);
    const opts = { width, lineGap };
    const hFull = doc.heightOfString(t, opts);
    if (hFull <= budget)
        return { chunk: t, rest: '' };
    let lo = 1;
    let hi = t.length;
    let best = 1;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        const h = doc.heightOfString(t.slice(0, mid), opts);
        if (h <= budget) {
            best = mid;
            lo = mid + 1;
        }
        else
            hi = mid - 1;
    }
    let cut = best;
    const br = t.lastIndexOf('\n\n', cut);
    const paragraphBreak = br >= 0 ? br + 2 : -1;
    const sp = t.lastIndexOf(' ', cut);
    const softBreak = sp >= 40 ? sp + 1 : -1;
    const preferNice = paragraphBreak >= 40 ? paragraphBreak : softBreak;
    if (preferNice >= 40 && preferNice <= cut && doc.heightOfString(t.slice(0, preferNice), opts) <= budget) {
        cut = preferNice;
    }
    let chunk = t.slice(0, cut).trimEnd();
    /** Never return empty chunk when there is remainder (prevents footer-only filler pages). */
    if (!chunk.length) {
        const first = [...t][0] ?? '';
        const restChars = [...t].slice(1).join('');
        return { chunk: first, rest: restChars.trimStart() };
    }
    const rest = t.slice(cut).trimStart();
    return { chunk, rest };
}
/** Strip lightweight markdown noise from paragraph copy (PDF has no Markdown engine). */
function stripInlineMarkdownForPdf(s) {
    return s
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/__([^_]+)__/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/_([^_]+)_/g, '$1')
        .replace(/`{1,3}([^`]+)`{1,3}/g, '$1')
        .replace(/^[-*+]\s+/gm, '• ')
        .replace(/^\s*#{1,6}\s+/gm, '');
}
/** Turn AI markdown-ish feedback into drawable segments with real headings (no "###" glyphs). */
function parseDetailedFeedbackMarkdown(full) {
    const text = full.replace(/\r\n/g, '\n').trim();
    const lines = text.split('\n');
    const segments = [];
    let buf = [];
    const flushParagraph = () => {
        const raw = buf.join('\n').trim();
        buf = [];
        if (!raw)
            return;
        segments.push({ type: 'p', text: stripInlineMarkdownForPdf(raw) });
    };
    const H_RE = /^\s{0,3}(#{1,6})\s*(.+?)\s*$/;
    const RULE_RE = /^\s*(?:[-*_]\s*){3,}\s*$/;
    const EM_DASH_RULE = /^\s*[—\-=]{3,}\s*$/;
    for (const line of lines) {
        if (!line.trim()) {
            flushParagraph();
            continue;
        }
        if (RULE_RE.test(line) || EM_DASH_RULE.test(line)) {
            flushParagraph();
            segments.push({ type: 'rule' });
            continue;
        }
        const hm = H_RE.exec(line);
        if (hm) {
            flushParagraph();
            const n = Math.min(3, Math.max(1, hm[1].length));
            const title = stripInlineMarkdownForPdf(hm[2]).trim();
            if (title)
                segments.push({ type: 'h', level: n, text: title });
            continue;
        }
        buf.push(line);
    }
    flushParagraph();
    return segments;
}
/** Merge consecutive paragraph segments so one flow paints fewer page breaks */
function coalesceAdjacentParagraphSegments(segments) {
    const out = [];
    for (const seg of segments) {
        if (seg.type !== 'p') {
            out.push(seg);
            continue;
        }
        const prev = out[out.length - 1];
        if (prev?.type === 'p') {
            prev.text = `${prev.text}\n\n${seg.text}`;
        }
        else
            out.push({ ...seg });
    }
    return out;
}
function collapseDuplicateRuleSegments(segments) {
    const out = [];
    for (const seg of segments) {
        if (seg.type === 'rule' && out[out.length - 1]?.type === 'rule')
            continue;
        out.push(seg);
    }
    return out;
}
const PDF_TRUNCATE_NOTE = '\n\n[…Truncated for PDF length; open LetsCrack to read the full text.]';
/** Hard caps keep AI reports printable (verbatim essays + models were ballooning past 100+ pages). */
function clampPdfParagraph(raw, maxChars) {
    const t = raw.trim();
    if (!t.length)
        return t;
    if (t.length <= maxChars)
        return t;
    const headBudget = Math.max(0, maxChars - PDF_TRUNCATE_NOTE.length);
    return `${t.slice(0, headBudget).trimEnd()}${PDF_TRUNCATE_NOTE}`;
}
function headingFontSize(level) {
    if (level === 1)
        return 12;
    if (level === 2)
        return 10.75;
    return 10;
}
function buildDetailedBody(task) {
    /** Separate caps: feedback vs long verbatim blobs (main cause of 80–120+ page PDFs). */
    const MAX_DETAIL_FEEDBACK = 12_000;
    const MAX_MODEL = 4_800;
    const MAX_SUBMISSION = 4_800;
    const parts = [];
    if (task.detailedFeedback?.trim())
        parts.push(clampPdfParagraph(task.detailedFeedback.trim(), MAX_DETAIL_FEEDBACK));
    if (task.strengths?.length) {
        parts.push(['## Strengths', ...task.strengths.map((s) => `• ${s}`)].join('\n'));
    }
    if (task.improvements?.length) {
        parts.push(['## Areas for improvement', ...task.improvements.map((s) => `• ${s}`)].join('\n'));
    }
    if (task.quickTips?.length) {
        parts.push(['## Quick tips', ...task.quickTips.map((s) => `• ${s}`)].join('\n'));
    }
    if (task.lineFeedback?.length) {
        const MAX_LINE_ROWS = 40;
        const rows = task.lineFeedback.slice(0, MAX_LINE_ROWS);
        const lines = rows.map((row) => `Original: ${row.original || '—'}\nIssue: ${row.issue || '—'}\nSuggested fix: ${row.fix || '—'}`);
        const more = task.lineFeedback.length > MAX_LINE_ROWS
            ? `\n\n[…${task.lineFeedback.length - MAX_LINE_ROWS} more line notes omitted in PDF.]`
            : '';
        parts.push(['## Line-level corrections', ...lines].join('\n\n') + more);
    }
    if (task.modelAnswer?.trim()) {
        parts.push(`## Model answer (study example)\n\n${clampPdfParagraph(task.modelAnswer.trim(), MAX_MODEL)}`);
    }
    if (task.responseText?.trim()) {
        parts.push(`## Student submission (verbatim)\n\n${clampPdfParagraph(task.responseText.trim(), MAX_SUBMISSION)}`);
    }
    /** Plain double-newline — avoids stray em-dash paragraphs that waste vertical space */
    return parts.join('\n\n');
}
/**
 * Generate task-wise AI evaluation PDF — LetsCrack template (summary page + detailed page(s) per task).
 * ✅ AGGRESSIVE FIX: Eliminates excessive spacing gaps
 */
export const generateAiEvaluationReport = (res, data) => {
    const doc = new PDFDocument({ size: 'A4', margin: 42, bufferPages: true });
    doc.pipe(res);
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const margin = 42;
    const contentW = pageWidth - margin * 2;
    /**
     * Page 1 — grid, remark, 4 category boxes (template layout).
     */
    const drawSummaryPage = (task) => {
        const tn = Number(task.taskNumber) || 1;
        doc.rect(0, 0, pageWidth, pageHeight).fill(LC.cream);
        let contentTop = drawBrandHeader(doc, pageWidth, margin, tn, false);
        contentTop += 12;
        const cellW = (contentW - 10) / 2;
        const cellH = 38;
        const row1y = contentTop;
        strokeRect(doc, margin, row1y, cellW, cellH);
        strokeRect(doc, margin + cellW + 10, row1y, cellW, cellH);
        strokeRect(doc, margin, row1y + cellH + 8, cellW, cellH);
        strokeRect(doc, margin + cellW + 10, row1y + cellH + 8, cellW, cellH);
        doc.font('Helvetica-Bold').fontSize(8).fillColor('#111').text('NAME:', margin + 10, row1y + 8);
        doc.font('Helvetica').fontSize(10).text(data.studentName || '—', margin + 10, row1y + 22, { width: cellW - 20 });
        doc
            .font('Helvetica-Bold')
            .fontSize(8)
            .text(`TASK-${tn}:`, margin + cellW + 18, row1y + 8);
        doc.font('Helvetica').fontSize(9).text(writingTaskSubtitle(tn), margin + cellW + 18, row1y + 20, {
            width: cellW - 20,
        });
        const row2y = row1y + cellH + 8;
        doc.font('Helvetica-Bold').fontSize(8).text('BAND SCORE:', margin + 10, row2y + 8);
        doc.font('Helvetica-Bold').fontSize(14).fillColor('#111').text(`${task.overallBand ?? '—'} / 6`, margin + 10, row2y + 20);
        doc.font('Helvetica-Bold').fontSize(8).fillColor('#111').text('AI-BASED SCORING', margin + cellW + 18, row2y + 16);
        const remarkTop = row2y + cellH + 14;
        const remarkH = 88;
        doc.rect(margin, remarkTop, contentW, remarkH).fill(LC.blueSoft);
        strokeRect(doc, margin, remarkTop, contentW, remarkH);
        const chipW = 72;
        const chipX = margin + contentW / 2 - chipW / 2;
        doc.rect(chipX, remarkTop - 10, chipW, 18).fill('#ffffff');
        strokeRect(doc, chipX, remarkTop - 10, chipW, 18);
        doc.font('Helvetica-Bold').fontSize(9).fillColor('#111').text('REMARK', chipX + 18, remarkTop - 6);
        const remarkText = task.overallRemark?.trim() ||
            'Overall remark will appear here once AI generates it for this submission.';
        doc.font('Helvetica').fontSize(9).fillColor('#111').text(remarkText, margin + 14, remarkTop + 16, {
            width: contentW - 28,
            lineGap: 2,
            height: Math.max(12, remarkH - 26),
            ellipsis: true,
        });
        const gridTop = remarkTop + remarkH + 14;
        const boxW = (contentW - 10) / 2;
        const boxH = 118;
        const cb = task.categoryBullets || {};
        const drawCategoryBox = (x, y, label, body) => {
            const chipLabelW = Math.min(175, boxW - 16);
            const lx = x + boxW / 2 - chipLabelW / 2;
            doc.rect(x, y, boxW, boxH).fill('#ffffff');
            strokeRect(doc, x, y, boxW, boxH);
            doc.rect(lx, y - 9, chipLabelW, 16).fill('#ffffff');
            strokeRect(doc, lx, y - 9, chipLabelW, 16);
            doc.font('Helvetica-Bold').fontSize(7).fillColor('#111').text(label, lx + 6, y - 6, { width: chipLabelW - 12 });
            doc.font('Helvetica').fontSize(8).fillColor('#222').text(body, x + 10, y + 14, {
                width: boxW - 20,
                lineGap: 2,
                height: Math.max(10, boxH - 26),
                ellipsis: true,
            });
        };
        drawWatermarkLogo(doc, pageWidth, gridTop + boxH / 2 + 20, 1.35);
        drawCategoryBox(margin, gridTop, 'COHERENCE/MEANING', formatCategoryBullets(cb.coherenceMeaning));
        drawCategoryBox(margin + boxW + 10, gridTop, 'VOCABULARY', formatCategoryBullets(cb.vocabulary));
        drawCategoryBox(margin, gridTop + boxH + 12, 'READABILITY', formatCategoryBullets(cb.readability));
        drawCategoryBox(margin + boxW + 10, gridTop + boxH + 12, 'TASK FULFILLMENT', formatCategoryBullets(cb.taskFulfillment));
        doc.font('Helvetica').fontSize(7).fillColor('#666').text(`Test Set #${data.testSetNumber} · Generated ${data.generatedAt}`, margin, gridTop + boxH * 2 + 32, {
            width: contentW,
            align: 'center',
        });
        drawPageFooter(doc, pageWidth, margin);
    };
    /**
     * Following pages — detailed feedback bar + lined area (template layout).
     * ✅ AGGRESSIVE: Reduced ALL spacing gaps
     */
    const drawDetailedPages = (task) => {
        const tn = Number(task.taskNumber) || 1;
        const detailedText = buildDetailedBody(task).trim();
        const bodyFontSize = 9;
        const lineGap = 3;
        const renderOneDetailedPageChrome = () => {
            doc.rect(0, 0, pageWidth, pageHeight).fill(LC.cream);
            const headerBottom = drawBrandHeader(doc, pageWidth, margin, tn, true) + 2;
            const barH = 22;
            doc.rect(margin, headerBottom, contentW, barH).fill(LC.blueSoft);
            strokeRect(doc, margin, headerBottom, contentW, barH);
            doc.font('Helvetica-Bold').fontSize(10).fillColor('#111').text('DETAILED FEEDBACK', margin, headerBottom + 6, {
                width: contentW,
                align: 'center',
                height: barH - 2,
                ellipsis: true,
            });
            const contentTop = headerBottom + barH + 2;
            /** Use real page maxY so layout matches PDFKit (avoids phantom page breaks + half-empty sheets). */
            const pageMaxY = doc.page.maxY();
            const contentBottom = Math.min(pageMaxY - 6, pageHeight - margin - 12);
            drawLinedContentBackground(doc, margin, contentTop + 12, contentBottom - 16, contentW);
            drawWatermarkLogo(doc, pageWidth, (contentTop + contentBottom) / 2, 1.6);
            const contentTopY = contentTop + 4;
            const bottomY = contentBottom - 14;
            doc.x = margin;
            doc.y = contentTopY;
            return { contentTopY, bottomY };
        };
        if (!detailedText) {
            const c = renderOneDetailedPageChrome();
            doc
                .font('Helvetica')
                .fontSize(10)
                .fillColor('#555')
                .text('No detailed AI feedback blocks were stored for this task.', margin, c.contentTopY, {
                width: contentW,
                height: Math.max(40, c.bottomY - c.contentTopY - 44),
                ellipsis: true,
            });
            drawPageFooter(doc, pageWidth, margin);
            return;
        }
        let segmentsQueue = collapseDuplicateRuleSegments(coalesceAdjacentParagraphSegments(parseDetailedFeedbackMarkdown(detailedText).filter((seg) => {
            if (seg.type === 'p')
                return seg.text.trim().length > 0;
            return true;
        })));
        if (segmentsQueue.length === 0) {
            segmentsQueue = [{ type: 'p', text: stripInlineMarkdownForPdf(detailedText) }];
        }
        let firstDetailedSpread = true;
        let needsTightParagraphOpen = false;
        const paintHeadingRow = (cursorY, title, level, maxWrapHeight) => {
            const fs = headingFontSize(level);
            doc.font('Helvetica-Bold').fontSize(fs).fillColor('#0f172a');
            const textW = contentW - 14;
            const h = Math.min(doc.heightOfString(title, { width: textW, lineGap: 2 }), maxWrapHeight);
            doc.save();
            doc.fillColor(LC.blueDeep).opacity(0.92).rect(margin, cursorY + 3, 3.25, Math.max(fs + 6, h + 4)).fill();
            doc.restore();
            doc.font('Helvetica-Bold').fontSize(fs).fillColor('#0f172a');
            const boxH = Math.max(fs + lineGap + 4, maxWrapHeight);
            doc.text(title, margin + 10, cursorY, {
                width: textW,
                align: 'left',
                lineGap: 2,
                height: boxH,
                ellipsis: true,
            });
            const yNext = cursorY + h + 3;
            doc.x = margin;
            doc.y = yNext;
            return yNext;
        };
        const paintRuleRow = (cursorY) => {
            doc.save();
            doc.strokeColor('#cbd5e1').lineWidth(0.85).opacity(0.95);
            doc.moveTo(margin, cursorY + 4).lineTo(margin + contentW, cursorY + 4).stroke(); // 6 → 4
            doc.restore();
            const yNext = cursorY + 8;
            doc.x = margin;
            doc.y = yNext;
            return yNext;
        };
        while (segmentsQueue.length > 0) {
            /** Every continuation sheet starts on a fresh page — avoids overwriting + phantom gaps */
            if (!firstDetailedSpread)
                doc.addPage();
            firstDetailedSpread = false;
            const chrome = renderOneDetailedPageChrome();
            let yCursor = chrome.contentTopY;
            const zoneBottom = chrome.bottomY;
            let isFirstBlockOnPage = true;
            if (needsTightParagraphOpen && segmentsQueue[0]?.type === 'p') {
                yCursor += 1;
            }
            needsTightParagraphOpen = false;
            /** Keep a little room above footer band; slack follows our logical cursor */
            const slackNow = () => zoneBottom - yCursor - 6;
            const mustMoveToNextSheet = () => slackNow() < 12;
            let drewAnythingOnSheet = false;
            while (segmentsQueue.length > 0) {
                if (mustMoveToNextSheet())
                    break;
                const head = segmentsQueue[0];
                if (head.type === 'h') {
                    const gapTop = isFirstBlockOnPage ? 0 : 2;
                    yCursor += gapTop;
                    const textW = contentW - 14;
                    const fsz = headingFontSize(head.level);
                    let slab = Math.max(0, slackNow() - 6);
                    const minHeadingSlab = fsz + 6;
                    if (slab < minHeadingSlab)
                        break;
                    doc.font('Helvetica-Bold').fontSize(fsz);
                    const intrinsicH = doc.heightOfString(head.text, { width: textW, lineGap: 2 });
                    let titlePiece = head.text;
                    if (intrinsicH <= slab * 0.93) {
                        segmentsQueue.shift();
                    }
                    else {
                        const sliced = takeTextChunk(doc, head.text, textW, Math.max(minHeadingSlab, slab - 6), fsz, 2, 'Helvetica-Bold');
                        titlePiece = sliced.chunk.trimEnd();
                        const tail = sliced.rest.trimStart();
                        segmentsQueue.shift();
                        if (tail.length)
                            segmentsQueue.unshift({ type: 'h', level: head.level, text: tail });
                    }
                    const wrapCap = Math.max(minHeadingSlab, slab);
                    yCursor = paintHeadingRow(yCursor, titlePiece, head.level, wrapCap);
                    drewAnythingOnSheet = true;
                    isFirstBlockOnPage = false;
                    continue;
                }
                if (head.type === 'rule') {
                    if (slackNow() < 10)
                        break;
                    yCursor += isFirstBlockOnPage ? 0 : 1;
                    yCursor = paintRuleRow(yCursor);
                    segmentsQueue.shift();
                    drewAnythingOnSheet = true;
                    isFirstBlockOnPage = false;
                    continue;
                }
                let paragraph = head.text.trim();
                if (!paragraph) {
                    segmentsQueue.shift();
                    continue;
                }
                const paraLead = isFirstBlockOnPage ? 0 : 2;
                const yStartDraw = yCursor + paraLead;
                /** One vertical budget shared by chunk splitter + drawn box → no spill past zoneBottom */
                const availH = Math.max(10, zoneBottom - yStartDraw - 6);
                const { chunk, rest } = takeTextChunk(doc, paragraph, contentW, availH, bodyFontSize, lineGap);
                let bodyBlock = chunk;
                if (!bodyBlock.length && paragraph.length > 0) {
                    bodyBlock = [...paragraph][0] ?? '';
                    paragraph = [...paragraph].slice(1).join('').trimStart();
                }
                if (!bodyBlock.length) {
                    segmentsQueue.shift();
                    continue;
                }
                doc.font('Helvetica').fontSize(bodyFontSize).fillColor('#1e293b');
                if (availH < 8)
                    break;
                doc.text(bodyBlock, margin, yStartDraw, {
                    width: contentW,
                    align: 'left',
                    lineGap,
                    height: availH,
                });
                const naturalH = doc.heightOfString(bodyBlock, { width: contentW, lineGap });
                yCursor = yStartDraw + Math.min(naturalH, availH) + 4;
                doc.x = margin;
                doc.y = yCursor;
                isFirstBlockOnPage = false;
                if (rest.length)
                    segmentsQueue[0] = { type: 'p', text: rest };
                else
                    segmentsQueue.shift();
                drewAnythingOnSheet = true;
            }
            needsTightParagraphOpen =
                drewAnythingOnSheet && segmentsQueue.length > 0 && segmentsQueue[0].type === 'p';
            doc.font('Helvetica').fontSize(bodyFontSize).fillColor('#111111');
            drawPageFooter(doc, pageWidth, margin);
        }
    };
    if (!data.tasks.length) {
        doc.rect(0, 0, pageWidth, pageHeight).fill(LC.cream);
        doc.font('Times-Bold').fontSize(14).fillColor('#111').text("LET'S CRACK ENGLISH — AI REPORT", margin, 80, {
            width: contentW,
            align: 'center',
        });
        doc.font('Helvetica').fontSize(11).text('No task-wise AI writing data available yet.', margin, 120, { width: contentW });
        drawPageFooter(doc, pageWidth, margin);
        doc.end();
        logger.info(`AI evaluation PDF generated for ${data.studentName} (empty tasks)`);
        return;
    }
    const sortedTasks = [...data.tasks].sort((a, b) => Number(a.taskNumber) - Number(b.taskNumber));
    sortedTasks.forEach((task, idx) => {
        if (idx > 0)
            doc.addPage();
        drawSummaryPage(task);
        doc.addPage();
        drawDetailedPages(task);
    });
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
        doc.switchToPage(i);
        doc.save();
        doc.font('Helvetica').fontSize(7).fillColor('#999999');
        doc.text(`Page ${i - range.start + 1} of ${range.count}`, margin, 820, {
            align: 'right',
            width: contentW,
        });
        doc.restore();
    }
    doc.end();
    logger.info(`AI evaluation PDF generated (LetsCrack template) for ${data.studentName}`);
};
export default { generateCertificate, generateAiEvaluationReport };
//# sourceMappingURL=pdf.js.map