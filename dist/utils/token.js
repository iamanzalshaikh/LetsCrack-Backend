import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
const ACCESS_EXPIRES_IN = "24h";
const REFRESH_EXPIRES_IN = "7d";
const ACCESS_TOKEN_MAX_AGE = 24 * 60 * 60 * 1000; // 24h
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7d
const isProduction = env.NODE_ENV === "production";
// =============================================
// SIGN TOKENS
// =============================================
export function signUserAccessToken(userId, email, role, schoolId) {
    return jwt.sign({ userId, email, role, schoolId }, env.JWT_ACCESS_SECRET, {
        expiresIn: ACCESS_EXPIRES_IN,
    });
}
export function signUserRefreshToken(userId) {
    return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_EXPIRES_IN,
    });
}
// =============================================
// VERIFY TOKENS
// =============================================
export function verifyUserAccessToken(token) {
    try {
        return jwt.verify(token, env.JWT_ACCESS_SECRET);
    }
    catch {
        return null;
    }
}
export function verifyUserRefreshToken(token) {
    try {
        return jwt.verify(token, env.JWT_REFRESH_SECRET);
    }
    catch {
        return null;
    }
}
// =============================================
// COOKIES
// =============================================
export const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie("token", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: ACCESS_TOKEN_MAX_AGE,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: REFRESH_TOKEN_MAX_AGE,
    });
};
export const clearAuthCookies = (res) => {
    res.clearCookie("token", { httpOnly: true, secure: isProduction });
    res.clearCookie("refreshToken", { httpOnly: true, secure: isProduction });
};
//# sourceMappingURL=token.js.map