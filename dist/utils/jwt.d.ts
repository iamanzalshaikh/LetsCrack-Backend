import { JwtPayload } from "jsonwebtoken";
export interface UserTokenPayload extends JwtPayload {
    userId: string;
    email?: string;
    role?: string;
    schoolId?: string | null;
    name?: string;
}
export interface RefreshTokenResult {
    token: string;
    jti: string;
}
export declare function signUserAccessToken(userId: string, email?: string, role?: string, schoolId?: string | null, name?: string): string;
export declare function signUserRefreshToken(userId: string): Promise<RefreshTokenResult>;
export declare function verifyUserAccessToken(token: string): UserTokenPayload | null;
export declare function verifyUserRefreshToken(token: string): Promise<UserTokenPayload | null>;
export declare function revokeRefreshToken(jti: string): Promise<void>;
