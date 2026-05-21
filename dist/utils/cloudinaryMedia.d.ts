/**
 * Student speaking recordings — stored in Cloudinary.
 */
export declare function uploadStudentSpeakingAudio(fileBuffer: Buffer, studentId: string, testSetNumber: number, taskNumber: number, subTask: "A" | "B" | null): Promise<string>;
/**
 * Best-effort delete for retention purge (Cloudinary URLs only).
 */
export declare function tryDestroyCloudinaryUrl(url: string): Promise<void>;
