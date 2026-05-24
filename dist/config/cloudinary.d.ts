import { v2 as cloudinary } from "cloudinary";
declare const uploadOnCloudinary: (fileBuffer: Buffer, options?: {
    folder?: string;
    resource_type?: "auto" | "video" | "image" | "raw";
}) => Promise<string | null>;
export { uploadOnCloudinary, cloudinary };
