import TestResult from '../models/TestResult.js';
import TestSession from '../models/TestSession.js';
import { generateCertificate } from '../utils/pdf.js';
/**
 * Get results for a specific test set
 */
export const getResults = async (req, res, next) => {
    try {
        const { testSetNumber } = req.params;
        const studentId = req.user.id;
        const result = await TestResult.findOne({
            studentId,
            testSetNumber: Number(testSetNumber)
        }).sort({ createdAt: -1 });
        if (!result) {
            return res.status(404).json({ error: 'Results not yet available for this test set' });
        }
        res.json({
            writingBand: result.writingBand?.finalBand,
            speakingBand: result.speakingBand?.finalBand,
            overallBand: result.overallBand,
            submittedAt: result.createdAt,
            publishedAt: result.publishedAt
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get all test attempts (Progress history)
 */
export const getProgress = async (req, res, next) => {
    try {
        const studentId = req.user.id;
        const attempts = await TestResult.find({ studentId })
            .sort({ createdAt: -1 });
        const formattedAttempts = attempts.map(a => ({
            setNumber: a.testSetNumber,
            writingBand: a.writingBand?.finalBand,
            speakingBand: a.speakingBand?.finalBand,
            date: a.createdAt
        }));
        res.json({ attempts: formattedAttempts });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Start a new test session
 */
export const startTest = async (req, res, next) => {
    try {
        const { testSetNumber } = req.params;
        const studentId = req.user.id;
        // Check for existing in-progress session for this student and set
        let session = await TestSession.findOne({
            studentId,
            testSetNumber: Number(testSetNumber),
            status: 'in_progress'
        });
        if (session) {
            return res.json({
                success: true,
                message: 'Resuming existing session',
                sessionId: session._id
            });
        }
        // Create new session
        session = new TestSession({
            studentId,
            testSetNumber: Number(testSetNumber),
            status: 'in_progress',
            startedAt: new Date()
        });
        await session.save();
        res.status(201).json({
            success: true,
            message: 'Test session started',
            sessionId: session._id
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get Certificate PDF stream
 */
export const getCertificate = async (req, res, next) => {
    try {
        const { resultId } = req.params;
        const result = await TestResult.findById(resultId)
            .populate('studentId', 'firstName lastName');
        if (!result)
            return res.status(404).json({ error: 'Result not found' });
        const student = result.studentId;
        const certificateData = {
            studentName: `${student.firstName} ${student.lastName}`,
            testSetNumber: result.testSetNumber || 1,
            writingBand: result.writingBand?.finalBand || 'N/A',
            speakingBand: result.speakingBand?.finalBand || 'N/A',
            overallBand: result.overallBand || 'N/A',
            date: result.publishedAt?.toLocaleDateString() || new Date().toLocaleDateString()
        };
        // Set PDF headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=CELPIP_Result_${resultId}.pdf`);
        // Stream the PDF
        generateCertificate(res, certificateData);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=student.controller.js.map