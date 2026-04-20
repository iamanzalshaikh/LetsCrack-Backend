import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { env } from '../config/env.js';
export const register = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, country } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        // Create new user
        const user = new User({
            email,
            password,
            firstName,
            lastName,
            country
        });
        await user.save();
        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_ACCESS_SECRET, {
            expiresIn: env.JWT_EXPIRE
        });
        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Update last login
        user.lastLoginAt = new Date();
        await user.save();
        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_ACCESS_SECRET, {
            expiresIn: env.JWT_EXPIRE
        });
        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
            },
            dashboardUrl: user.role === 'admin' ? '/admin/dashboard' : user.role === 'examiner' ? '/examiner/dashboard' : '/student/dashboard'
        });
    }
    catch (error) {
        next(error);
    }
};
export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully' });
};
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ success: true, user });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.controller.js.map