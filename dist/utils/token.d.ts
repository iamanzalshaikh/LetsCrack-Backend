import { JwtPayload } from "jsonwebtoken";
import { Response } from "express";
export interface UserTokenPayload extends JwtPayload {
    userId: string;
    email?: string;
    role?: string;
    schoolId?: string | null;
}
export declare function signUserAccessToken(userId: string, email?: string, role?: string, schoolId?: string | null): string;
export declare function signUserRefreshToken(userId: string): string;
export declare function verifyUserAccessToken(token: string): UserTokenPayload | null;
export declare function verifyUserRefreshToken(token: string): UserTokenPayload | null;
export declare const setAuthCookies: (res: Response, accessToken: string, refreshToken: string) => void;
export declare const clearAuthCookies: (res: Response) => void;
