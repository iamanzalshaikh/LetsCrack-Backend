import mongoose from 'mongoose';
import TestResult from '../models/TestResult.js';
import TestSession from '../models/TestSession.js';
import QuestionBank from '../models/QuestionBank.js';
import WritingQuestion from '../models/WritingQuestion.js';
import SpeakingQuestion from '../models/SpeakingQuestion.js';
import TestSet from '../models/TestSet.js';
import { generateCertificate, generateAiEvaluationReport } from '../utils/pdf.js';
import { computeEffectiveMediaPolicy } from '../utils/mediaPolicy.js';
/**
 * Get results for a specific test set
 * Optional query `sessionId`: when present (e.g. from /results/:setNumber?sessionId=…), load writing/speaking
 * from that attempt. Otherwise defaults to latest TestResult for the set — which often points at a **different**
 * session than the one just finished, so clients should pass sessionId after a test whenever possible.
 */
export const getResults = async (req, res, next) => {
    try {
        const { testSetNumber } = req.params;
        const studentId = req.user.id;
        const tn = Number(testSetNumber);
        const sessionIdQs = typeof req.query.sessionId === 'string' ? req.query.sessionId.trim() : '';
        const SESSION_PROJECT = 'writingResponses speakingRecordings status completedAt updatedAt';
        let session = null;
        let result = null;
        /** Resolve by URL session first so we attach writing to the attempt the student just finished. */
        if (sessionIdQs && mongoose.Types.ObjectId.isValid(sessionIdQs)) {
            const byAttempt = await TestSession.findOne({
                _id: new mongoose.Types.ObjectId(sessionIdQs),
                studentId,
                testSetNumber: tn,
            }).select(SESSION_PROJECT);
            if (byAttempt) {
                session = byAttempt;
                result = await TestResult.findOne({ studentId, testSessionId: byAttempt._id });
            }
        }
        /** No session query (or unknown id): fallback to legacy “latest scored result row” for this set. */
        if (!session) {
            const fallbackResult = (await TestResult.findOne({ studentId, testSetNumber: tn }).sort({ createdAt: -1 })) || null;
            if (!fallbackResult) {
                return res.status(404).json({ error: 'Results not yet available for this test set' });
            }
            if (!fallbackResult.testSessionId) {
                return res.status(404).json({ error: 'Results not yet available for this test set' });
            }
            const loaded = await TestSession.findById(fallbackResult.testSessionId).select(SESSION_PROJECT);
            if (!loaded) {
                return res.status(404).json({ error: 'Results not yet available for this test set' });
            }
            session = loaded;
            result = fallbackResult;
        }
        /** Explicit session match but grading has not upserted a TestResult row yet. */
        if (session && !result) {
            result =
                (await TestResult.findOne({ studentId, testSessionId: session._id })) || null;
        }
        const writingFeedback = session?.writingResponses
            ?.map((r) => String(r?.aiAnalysis?.feedback || '').trim())
            .filter((f) => Boolean(f)) || [];
        /** Prefer finalized rows per task; merge draft autosaves when Task N was skipped without Submit (legacy UX). */
        const pickResponsesForPayload = () => {
            const picks = new Map();
            const raw = Array.isArray(session?.writingResponses) ? session.writingResponses : [];
            for (const r of raw) {
                const tn = Number(r.taskNumber);
                if (!Number.isFinite(tn) || tn < 1)
                    continue;
                const text = String(r.responseText ?? '').trim();
                if (text.length < 40)
                    continue;
                const cur = picks.get(tn);
                if (!cur) {
                    picks.set(tn, r);
                    continue;
                }
                const rank = (x) => (Boolean(x.submittedAt) ? 1e12 : 0) + String(x.responseText ?? '').trim().length;
                if (rank(r) >= rank(cur))
                    picks.set(tn, r);
            }
            return [...picks.entries()]
                .sort((a, b) => a[0] - b[0])
                .map(([, r]) => ({
                taskNumber: Number(r.taskNumber),
                responseText: String(r.responseText || ''),
                wordCount: typeof r.wordCount === 'number' ? r.wordCount : undefined,
                submissionStatus: (r.submittedAt ? 'submitted' : 'draft'),
            }));
        };
        const writingSubmissions = pickResponsesForPayload();
        const writingInsights = session?.writingResponses
            ?.filter((r) => Boolean(r?.aiAnalysis))
            .sort((a, b) => Number(a.taskNumber || 0) - Number(b.taskNumber || 0))
            .map((r) => ({
            taskNumber: r.taskNumber,
            responseText: String(r.responseText || ''),
            overallBand: r.aiBand,
            coherence: r.aiAnalysis?.coherence,
            vocabulary: r.aiAnalysis?.vocabulary,
            readability: r.aiAnalysis?.readability,
            taskFulfillment: r.aiAnalysis?.taskFulfillment,
            taskAchievement: r.aiAnalysis?.taskAchievement,
            coherenceCohesion: r.aiAnalysis?.coherenceCohesion,
            lexicalResource: r.aiAnalysis?.lexicalResource,
            grammar: r.aiAnalysis?.grammar,
            feedback: String(r.aiAnalysis?.feedback || ''),
            overallRemark: String(r.aiAnalysis?.overallRemark || ''),
            detailedFeedback: String(r.aiAnalysis?.detailedFeedback || ''),
            categoryBullets: r.aiAnalysis?.categoryBullets || null,
            strengths: Array.isArray(r.aiAnalysis?.strengths) ? r.aiAnalysis.strengths : [],
            improvements: Array.isArray(r.aiAnalysis?.improvements) ? r.aiAnalysis.improvements : [],
            quickTips: Array.isArray(r.aiAnalysis?.quickTips) ? r.aiAnalysis.quickTips : [],
            lineFeedback: Array.isArray(r.aiAnalysis?.lineFeedback) ? r.aiAnalysis.lineFeedback : [],
            modelAnswer: String(r.aiAnalysis?.modelAnswer || ''),
        })) || [];
        const speakingFeedback = session?.speakingRecordings
            ?.map((r) => String(r?.aiAnalysis?.feedback || '').trim())
            .filter((f) => Boolean(f)) || [];
        const writingRows = await WritingQuestion.find({ testSetNumber: Number(testSetNumber) })
            .select('taskNumber')
            .sort({ taskNumber: 1 })
            .lean();
        const expectedWritingTaskNumbers = writingRows
            .map((w) => Number(w.taskNumber))
            .filter((n) => Number.isFinite(n) && n > 0);
        const sessionAny = session;
        res.json({
            ...(result ? { _id: String(result._id) } : {}),
            writingBand: result?.writingBand?.finalBand,
            speakingBand: result?.speakingBand?.finalBand,
            readingBand: result?.readingBand?.finalBand,
            listeningBand: result?.listeningBand?.finalBand,
            overallBand: result?.overallBand,
            submittedAt: result?.createdAt ?? sessionAny?.completedAt ?? sessionAny?.updatedAt,
            publishedAt: result?.publishedAt,
            writingFeedback,
            writingSubmissions,
            writingInsights,
            expectedWritingTaskNumbers,
            speakingFeedback,
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
 * Get per-session submission and grading status
 */
export const getResultStatus = async (req, res, next) => {
    try {
        const { sessionId } = req.params;
        const studentId = req.user.id;
        const session = await TestSession.findOne({ _id: sessionId, studentId });
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        const selectedModules = session.selectedModules || ['writing', 'speaking'];
        const [totalWritingTasks, totalSpeakingTasks, readingTask, listeningTask] = await Promise.all([
            WritingQuestion.countDocuments({ testSetNumber: session.testSetNumber }),
            SpeakingQuestion.countDocuments({ testSetNumber: session.testSetNumber }),
            QuestionBank.findOne({ module: 'reading', testSetNumber: session.testSetNumber }).select('mcqs'),
            QuestionBank.findOne({ module: 'listening', testSetNumber: session.testSetNumber }).select('mcqs'),
        ]);
        const totalReadingTasks = readingTask?.mcqs?.length || 0;
        const totalListeningTasks = listeningTask?.mcqs?.length || 0;
        const submittedWriting = selectedModules.includes('writing')
            ? session.writingResponses.filter((r) => Boolean(r.submittedAt)).length
            : 0;
        const submittedSpeaking = selectedModules.includes('speaking') ? session.speakingRecordings.length : 0;
        const submittedReading = selectedModules.includes('reading')
            ? session.mcqResponses.filter((r) => r.module === 'reading').length
            : 0;
        const submittedListening = selectedModules.includes('listening')
            ? session.mcqResponses.filter((r) => r.module === 'listening').length
            : 0;
        const gradedWriting = session.writingResponses.filter((r) => (r.aiBand || 0) > 0).length;
        const gradedSpeaking = session.speakingRecordings.filter((r) => (r.aiBand || 0) > 0).length;
        const gradedReading = submittedReading > 0 ? totalReadingTasks : 0;
        const gradedListening = submittedListening > 0 ? totalListeningTasks : 0;
        const expectedWriting = selectedModules.includes('writing') ? totalWritingTasks : 0;
        const expectedSpeaking = selectedModules.includes('speaking') ? totalSpeakingTasks : 0;
        const expectedReading = selectedModules.includes('reading') ? totalReadingTasks : 0;
        const expectedListening = selectedModules.includes('listening') ? totalListeningTasks : 0;
        const totalSubmitted = submittedWriting + submittedSpeaking + submittedReading + submittedListening;
        const totalExpected = expectedWriting + expectedSpeaking + expectedReading + expectedListening;
        const totalGraded = gradedWriting + gradedSpeaking + gradedReading + gradedListening;
        let status = 'in_progress';
        if (session.status === 'graded') {
            status = 'graded';
        }
        else if (totalSubmitted >= totalExpected && totalExpected > 0) {
            status = totalGraded >= totalExpected ? 'graded' : 'grading';
        }
        else if (session.status === 'submitted') {
            status = 'submitted';
        }
        return res.json({
            sessionId: session._id,
            mode: session.mode || 'practice',
            selectedModules,
            instructionsAccepted: Boolean(session.instructionsAccepted),
            status,
            progress: {
                writing: { submitted: submittedWriting, graded: gradedWriting, total: expectedWriting },
                speaking: { submitted: submittedSpeaking, graded: gradedSpeaking, total: expectedSpeaking },
                reading: { submitted: submittedReading, graded: gradedReading, total: expectedReading },
                listening: { submitted: submittedListening, graded: gradedListening, total: expectedListening },
                overall: { submitted: totalSubmitted, graded: totalGraded, total: totalExpected },
            },
            submittedAt: session.completedAt || null,
            startedAt: session.startedAt,
        });
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
        const { mode = 'practice', selectedModules = ['writing', 'speaking'], forceNewSession = false, } = req.body;
        const allowedModes = ['practice', 'simulation'];
        if (!allowedModes.includes(mode)) {
            return res.status(400).json({ error: 'Invalid mode. Use practice or simulation.' });
        }
        const testSet = await TestSet.findOne({
            testSetNumber: Number(testSetNumber),
            status: 'published',
        });
        if (!testSet) {
            return res.status(404).json({ error: 'Published test set not found' });
        }
        const validModules = ['listening', 'reading', 'writing', 'speaking'];
        const sanitizedModules = (selectedModules || [])
            .filter((m) => validModules.includes(m))
            .filter((m) => testSet.modules.includes(m));
        if (!sanitizedModules.length) {
            return res.status(400).json({ error: 'At least one valid module is required.' });
        }
        // Check for existing in-progress session for this student and set
        let session = await TestSession.findOne({
            studentId,
            testSetNumber: Number(testSetNumber),
            status: 'in_progress'
        });
        if (session) {
            if (forceNewSession) {
                await TestSession.deleteOne({ _id: session._id });
                session = null;
            }
        }
        if (session) {
            // User may have changed module/mode on the setup screen; the old session
            // still had the previous selection. Apply the new choice until they confirm instructions.
            if (!session.instructionsAccepted) {
                session.mode = mode;
                session.selectedModules = sanitizedModules;
                await session.save();
                return res.json({
                    success: true,
                    message: 'Session updated',
                    sessionId: session._id,
                    mode: session.mode,
                    selectedModules: session.selectedModules,
                });
            }
            return res.json({
                success: true,
                message: 'Ongoing session found',
                sessionId: session._id,
                mode: session.mode || 'practice',
                selectedModules: session.selectedModules || ['writing', 'speaking'],
                hasOngoingSession: true,
            });
        }
        // Create new session
        session = new TestSession({
            studentId,
            testSetNumber: Number(testSetNumber),
            mode,
            selectedModules: sanitizedModules,
            instructionsAccepted: false,
            purgeAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 48h retention
            status: 'in_progress',
            startedAt: new Date()
        });
        await session.save();
        res.status(201).json({
            success: true,
            message: 'Test session started',
            sessionId: session._id,
            mode: session.mode,
            selectedModules: session.selectedModules,
            hasOngoingSession: false,
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Confirm pre-test instructions for a session
 */
export const confirmInstructions = async (req, res, next) => {
    try {
        const { sessionId } = req.params;
        const studentId = req.user.id;
        const session = await TestSession.findOneAndUpdate({ _id: sessionId, studentId, status: 'in_progress' }, { $set: { instructionsAccepted: true } }, { new: true });
        if (!session)
            return res.status(404).json({ error: 'Session not found' });
        return res.json({
            success: true,
            sessionId: session._id,
            instructionsAccepted: Boolean(session.instructionsAccepted),
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get test instructions by mode for a specific set
 */
export const getTestInstructions = async (req, res, next) => {
    try {
        const { testSetNumber } = req.params;
        const { mode = 'practice' } = req.query;
        const testSet = await TestSet.findOne({
            testSetNumber: Number(testSetNumber),
            status: 'published',
        });
        if (!testSet)
            return res.status(404).json({ error: 'Published test set not found' });
        const instructions = mode === 'simulation'
            ? testSet.instructions?.simulation || ''
            : testSet.instructions?.practice || '';
        return res.json({
            testSetNumber: testSet.testSetNumber,
            mode,
            instructions,
            modules: testSet.modules,
            estimatedTimeMinutes: testSet.estimatedTimeMinutes,
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Record media runtime interaction and enforce backend media policy
 */
export const recordMediaRuntimeEvent = async (req, res, next) => {
    try {
        const studentId = req.user.id;
        const { sessionId, module, taskNumber = 1, eventType, subTask: bodySub, } = req.body;
        if (!sessionId || !module || !eventType) {
            return res.status(400).json({ error: 'sessionId, module and eventType are required' });
        }
        if (!['play_start', 'replay_attempt', 'seek_attempt'].includes(eventType)) {
            return res.status(400).json({ error: 'Invalid eventType' });
        }
        const session = await TestSession.findOne({ _id: sessionId, studentId, status: 'in_progress' });
        if (!session)
            return res.status(404).json({ error: 'Session not found' });
        if (!session.instructionsAccepted) {
            return res.status(403).json({ error: 'Instructions must be accepted before starting the test' });
        }
        const selectedModules = session.selectedModules || ['writing', 'speaking'];
        if (!selectedModules.includes(module)) {
            return res.status(403).json({ error: `${module} module is not enabled for this session` });
        }
        const tn = Number(taskNumber);
        const speakingSub = module === 'speaking' && tn === 5 ? (bodySub === 'B' ? 'B' : 'A') : null;
        const question = module === 'writing'
            ? await WritingQuestion.findOne({
                testSetNumber: Number(session.testSetNumber),
                taskNumber: tn,
            })
            : module === 'speaking'
                ? await SpeakingQuestion.findOne({
                    testSetNumber: Number(session.testSetNumber),
                    taskNumber: tn,
                    subTask: speakingSub,
                })
                : await QuestionBank.findOne({
                    module,
                    testSetNumber: Number(session.testSetNumber),
                });
        if (!question)
            return res.status(404).json({ error: 'Question not found for runtime policy check' });
        const hasMedia = question.mediaType !== 'none' ||
            Boolean(question.mediaUrl) ||
            Boolean(question.audioUrl) ||
            Boolean(question.instructionVideoUrl);
        if (!hasMedia) {
            return res.status(400).json({ error: 'No media configured for this task/module' });
        }
        const effectivePolicy = computeEffectiveMediaPolicy(session.mode || 'practice', {
            allowReplay: question.allowReplay,
            allowSeek: question.allowSeek,
            playLimit: question.playLimit,
        });
        const runtimeRows = (session.mediaRuntime || []);
        const runtimeIndex = runtimeRows.findIndex((r) => {
            if (r.module !== module || Number(r.taskNumber || 1) !== tn)
                return false;
            if (module === 'speaking' && tn === 5) {
                return (r.subTask || 'A') === (speakingSub || 'A');
            }
            return !r.subTask;
        });
        const current = runtimeIndex >= 0
            ? runtimeRows[runtimeIndex]
            : {
                module,
                taskNumber: tn,
                subTask: module === 'speaking' && tn === 5 ? speakingSub : null,
                playCount: 0,
                seekCount: 0,
                blockedCount: 0,
            };
        let allowed = true;
        let reason = 'ok';
        const playCount = Number(current.playCount || 0);
        const seekCount = Number(current.seekCount || 0);
        const blockedCount = Number(current.blockedCount || 0);
        if (eventType === 'seek_attempt' && !effectivePolicy.allowSeek) {
            allowed = false;
            reason = 'seek_disabled';
        }
        if ((eventType === 'play_start' || eventType === 'replay_attempt') && !effectivePolicy.allowReplay && playCount >= 1) {
            allowed = false;
            reason = 'replay_disabled';
        }
        if ((eventType === 'play_start' || eventType === 'replay_attempt') && effectivePolicy.playLimit > 0 && playCount >= effectivePolicy.playLimit) {
            allowed = false;
            reason = 'play_limit_exceeded';
        }
        const nextState = {
            module,
            taskNumber: tn,
            subTask: module === 'speaking' && tn === 5 ? speakingSub : null,
            playCount: playCount + (allowed && eventType === 'play_start' ? 1 : 0),
            seekCount: seekCount + (eventType === 'seek_attempt' ? 1 : 0),
            blockedCount: blockedCount + (allowed ? 0 : 1),
            lastEventAt: new Date(),
        };
        if (runtimeIndex >= 0) {
            runtimeRows[runtimeIndex] = nextState;
        }
        else {
            runtimeRows.push(nextState);
        }
        session.mediaRuntime = runtimeRows;
        await session.save();
        return res.json({
            success: true,
            allowed,
            reason,
            policy: effectivePolicy,
            runtimeState: nextState,
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
/**
 * Download full task-wise AI writing report as PDF
 */
export const getAiEvaluationReport = async (req, res, next) => {
    try {
        const { testSetNumber } = req.params;
        const student = req.user;
        const studentId = student.id;
        const tn = Number(testSetNumber);
        const sessionIdQs = typeof req.query.sessionId === 'string' ? req.query.sessionId.trim() : '';
        let session = null;
        let result = null;
        if (sessionIdQs && mongoose.Types.ObjectId.isValid(sessionIdQs)) {
            session = await TestSession.findOne({
                _id: new mongoose.Types.ObjectId(sessionIdQs),
                studentId,
                testSetNumber: tn,
            }).select('writingResponses');
            if (session) {
                result = await TestResult.findOne({ studentId, testSessionId: session._id });
            }
        }
        if (!session) {
            result = await TestResult.findOne({ studentId, testSetNumber: tn }).sort({ createdAt: -1 });
            if (!result?.testSessionId) {
                return res.status(404).json({ error: 'Result not ready for PDF report yet' });
            }
            session = await TestSession.findById(result.testSessionId).select('writingResponses');
        }
        if (!session)
            return res.status(404).json({ error: 'Session not found for AI report' });
        const writingRows = Array.isArray(session.writingResponses) ? session.writingResponses : [];
        const tasks = writingRows
            .map((r) => ({
            taskNumber: Number(r.taskNumber || 0),
            responseText: String(r.responseText || ''),
            wordCount: typeof r.wordCount === 'number' ? r.wordCount : undefined,
            overallBand: r.aiBand,
            coherence: r.aiAnalysis?.coherence,
            vocabulary: r.aiAnalysis?.vocabulary,
            readability: r.aiAnalysis?.readability,
            taskFulfillment: r.aiAnalysis?.taskFulfillment,
            taskAchievement: r.aiAnalysis?.taskAchievement,
            coherenceCohesion: r.aiAnalysis?.coherenceCohesion,
            lexicalResource: r.aiAnalysis?.lexicalResource,
            grammar: r.aiAnalysis?.grammar,
            overallRemark: String(r.aiAnalysis?.overallRemark || ''),
            detailedFeedback: String(r.aiAnalysis?.detailedFeedback || ''),
            categoryBullets: r.aiAnalysis?.categoryBullets || undefined,
            strengths: Array.isArray(r.aiAnalysis?.strengths) ? r.aiAnalysis.strengths : [],
            improvements: Array.isArray(r.aiAnalysis?.improvements) ? r.aiAnalysis.improvements : [],
            quickTips: Array.isArray(r.aiAnalysis?.quickTips) ? r.aiAnalysis.quickTips : [],
            lineFeedback: Array.isArray(r.aiAnalysis?.lineFeedback) ? r.aiAnalysis.lineFeedback : [],
            modelAnswer: String(r.aiAnalysis?.modelAnswer || ''),
        }))
            .filter((r) => Number.isFinite(r.taskNumber) && r.taskNumber > 0)
            .sort((a, b) => a.taskNumber - b.taskNumber);
        const studentName = `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'Student';
        const generatedAt = new Date().toLocaleString();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=LetsCrack_AI_Report_Set${tn}_${studentName.replace(/\s+/g, '_')}.pdf`);
        generateAiEvaluationReport(res, {
            studentName,
            testSetNumber: tn,
            generatedAt,
            overallBand: result?.overallBand,
            writingBand: result?.writingBand?.finalBand,
            tasks,
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get all available test sets for the library
 */
export const getAvailableTests = async (req, res, next) => {
    try {
        const publishedSets = await TestSet.find({ status: 'published' }).sort({ testSetNumber: 1 });
        const enrichedSets = publishedSets.map((set) => ({
            testSetNumber: set.testSetNumber,
            title: set.title,
            description: set.description,
            moduleCount: set.modules.length,
            supportedModes: set.modeSupport,
            estimatedTime: `${set.estimatedTimeMinutes} minutes`,
            modules: set.modules,
        }));
        res.json({ testSets: enrichedSets });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=student.controller.js.map