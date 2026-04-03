// ================================================================
// JWT Utilities — POS SaaS v4.0 (Imported from POS-BACKEND)
//
// Issue #6 FIX: Refresh tokens use jti (UUID) stored in Redis.
//   On issue  → jti saved to Redis with 7d TTL
//   On refresh → verify jti exists, rotate (del old, set new)
//   On logout  → del jti (token immediately invalidated)
//
// This prevents stolen refresh tokens being used post-logout/refresh.
// ================================================================

import jwt, { JwtPayload } from "jsonwebtoken";
import { randomUUID } from "crypto";
import { env } from "../config/env.js";
import redis from "../config/redis.js";

const ACCESS_EXPIRES_IN   = "24h";
const REFRESH_EXPIRES_IN  = "7d";
const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days in seconds
const REFRESH_JTI_PREFIX  = "refresh_jti:";

// ============================================
// TYPES
// ============================================

export interface UserTokenPayload extends JwtPayload {
  userId:   string;
  email?:   string;
  role?:    string;
  schoolId?: string | null; // Changed storeId to schoolId for consistency
  name?:    string;
}

export interface RefreshTokenResult {
  token: string;
  jti:   string;
}

// ============================================
// SIGN TOKENS
// ============================================

export function signUserAccessToken(
  userId:   string,
  email?:   string,
  role?:    string,
  schoolId?: string | null,
  name?:    string,
): string {
  const payload: UserTokenPayload = { userId, email, role, schoolId, name };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
}

// FIX #6 — Refresh token now includes jti + registers it in Redis
export async function signUserRefreshToken(userId: string): Promise<RefreshTokenResult> {
  const jti = randomUUID();
  const token = jwt.sign({ userId, jti }, env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
  // Note: Using ioredis compatible set method
  await redis.set(`${REFRESH_JTI_PREFIX}${jti}`, "1", "EX", REFRESH_TTL_SECONDS);
  return { token, jti };
}

// ============================================
// VERIFY TOKENS
// ============================================

export function verifyUserAccessToken(token: string): UserTokenPayload | null {
  try {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as UserTokenPayload;
  } catch {
    return null;
  }
}

// FIX #6 — Verify refresh token AND confirm jti is still in Redis
export async function verifyUserRefreshToken(token: string): Promise<UserTokenPayload | null> {
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as UserTokenPayload & { jti?: string };
    if (!decoded.jti) return null;

    // Check jti is still valid in Redis (not yet rotated or revoked)
    const valid = await redis.get(`${REFRESH_JTI_PREFIX}${decoded.jti}`);
    if (!valid) return null;

    return decoded;
  } catch {
    return null;
  }
}

// FIX #6 — Rotate: invalidate old jti (called during refresh)
export async function revokeRefreshToken(jti: string): Promise<void> {
  await redis.del(`${REFRESH_JTI_PREFIX}${jti}`);
}
