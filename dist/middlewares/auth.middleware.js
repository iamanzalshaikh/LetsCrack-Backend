import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';
import User from '../models/User.js';
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        logger.error('Authentication error:', error);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
export const requireRole = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};
//# sourceMappingURL=auth.middleware.js.map