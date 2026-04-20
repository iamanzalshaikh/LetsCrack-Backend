import QuestionBank from '../models/QuestionBank.js';
import TestResult from '../models/TestResult.js';
import User from '../models/User.js';
import { sendResultEmail } from '../utils/email.js';
/**
 * Manage CELPIP Question Bank
 * Supports Writing, Speaking, Reading, and Listening modules
 */
export const createOrUpdateQuestion = async (req, res, next) => {
    try {
        const { module, testSetNumber, taskNumber, ...content } = req.body;
        // Validate module
        const validModules = ['writing', 'speaking', 'reading', 'listening'];
        if (!validModules.includes(module)) {
            return res.status(400).json({ error: 'Invalid module type' });
        }
        // Upsert logic for current test set and task
        const question = await QuestionBank.findOneAndUpdate({ module, testSetNumber, taskNumber }, { ...content, updatedAt: new Date() }, { new: true, upsert: true });
        res.json({
            success: true,
            questionId: question._id,
            created: question.createdAt === question.updatedAt
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Publish student results and bands
 */
export const publishResults = async (req, res, next) => {
    try {
        const { resultId } = req.params;
        const result = await TestResult.findById(resultId)
            .populate('studentId', 'firstName lastName email')
            .populate('testSessionId');
        if (!result)
            return res.status(404).json({ error: 'Test result not found' });
        // Mark as published
        result.publishedAt = new Date();
        // Logic for generating certificate URL would go here
        result.certificateUrl = `https://letscrackenglish.com/certificates/${result._id}`;
        await result.save();
        // Trigger Email Notification
        const student = result.studentId;
        if (student && student.email) {
            await sendResultEmail(student.email, student.firstName, result.testSetNumber || 1, result.overallBand || 'N/A');
        }
        res.json({
            success: true,
            publishedAt: result.publishedAt,
            certificateUrl: result.certificateUrl
        });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Manage Platform Users (Student, Examiner)
 */
export const getAllUsers = async (req, res, next) => {
    try {
        const { role } = req.query;
        const filter = role ? { role } : {};
        const users = await User.find(filter).select('-password');
        res.json({ users });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Delete a user from the platform
 */
export const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.json({ success: true, message: 'User deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=admin.controller.js.map