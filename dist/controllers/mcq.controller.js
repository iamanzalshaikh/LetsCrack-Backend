import TestSession from '../models/TestSession.js';
import QuestionBank from '../models/QuestionBank.js';
import { calculateBand } from '../utils/bandCalculator.js';
/**
 * Submit MCQ answers (Reading/Listening) and auto-grade
 * Body: { studentId, testSetNumber, module, answers: [{ questionId, selectedOption }] }
 */
export const submitMcqAnswers = async (req, res, next) => {
    try {
        const { studentId, testSetNumber, module, answers } = req.body;
        // Fetch the correct answers from the Question Bank
        const bankTask = await QuestionBank.findOne({
            module,
            testSetNumber: Number(testSetNumber)
        });
        if (!bankTask) {
            return res.status(404).json({ error: 'Question Bank entry not found for this module/set' });
        }
        let correctCount = 0;
        const totalQuestions = bankTask.mcqs.length;
        // Compare student answers with correct options
        const processedResponses = bankTask.mcqs.map((q) => {
            const studentAnswer = answers.find((a) => a.questionId === q._id.toString());
            const selectedOption = studentAnswer ? studentAnswer.selectedOption : -1;
            const isCorrect = selectedOption === q.correctOption;
            if (isCorrect)
                correctCount++;
            return {
                questionId: q._id,
                selectedOption,
                isCorrect
            };
        });
        // Calculate raw score and map to band (This is a simplified 1-12 mapping for MCQs)
        const rawPercentage = (correctCount / totalQuestions) * 100;
        const clbScore = Math.round((rawPercentage / 100) * 12); // Scaling to 1-12 range
        const band = calculateBand(clbScore);
        // Update or create the test session
        let session = await TestSession.findOneAndUpdate({ studentId, testSetNumber: Number(testSetNumber), status: 'in_progress' }, {
            $push: { mcqResponses: { $each: processedResponses } },
            $set: { mcqScore: correctCount }
        }, { new: true, upsert: true });
        res.json({
            success: true,
            score: correctCount,
            total: totalQuestions,
            percentage: rawPercentage.toFixed(2),
            band,
            sessionId: session._id
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get MCQ task (without correct answers)
 */
export const getMcqTask = async (req, res, next) => {
    try {
        const { module, setNumber } = req.params;
        const task = await QuestionBank.findOne({
            module,
            testSetNumber: Number(setNumber)
        }).select('-mcqs.correctOption'); // Security: Don't send correct answers to frontend
        if (!task)
            return res.status(404).json({ error: 'MCQ Task not found' });
        res.json(task);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=mcq.controller.js.map