import jwt, { JwtPayload } from "jsonwebtoken";
import { Response } from "express";
import { env } from "../config/env.js";

const ACCESS_EXPIRES_IN = "24h";
const REFRESH_EXPIRES_IN = "7d";

const ACCESS_TOKEN_MAX_AGE = 24 * 60 * 60 * 1000; // 24h
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7d

const isProduction = env.NODE_ENV === "production";

// =============================================
// TYPES
// =============================================

export interface UserTokenPayload extends JwtPayload {
  userId: string;
  email?: string;
  role?: string;
  schoolId?: string | null;
}

// =============================================
// SIGN TOKENS
// =============================================

export function signUserAccessToken(
  userId: string,
  email?: string,
  role?: string,
  schoolId?: string | null
): string {
  return jwt.sign({ userId, email, role, schoolId }, env.JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES_IN,
  });
}

export function signUserRefreshToken(userId: string): string {
  return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });
}

// =============================================
// VERIFY TOKENS
// =============================================

export function verifyUserAccessToken(token: string): UserTokenPayload | null {
  try {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as UserTokenPayload;
  } catch {
    return null;
  }
}

export function verifyUserRefreshToken(token: string): UserTokenPayload | null {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as UserTokenPayload;
  } catch {
    return null;
  }
}

// =============================================
// COOKIES
// =============================================

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
): void => {
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

export const clearAuthCookies = (res: Response): void => {
  res.clearCookie("token", { httpOnly: true, secure: isProduction });
  res.clearCookie("refreshToken", { httpOnly: true, secure: isProduction });
};
