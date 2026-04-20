import { v2 as cloudinary } from "cloudinary";
declare const uploadOnCloudinary: (fileBuffer: Buffer, folder?: string) => Promise<string | null>;
export { uploadOnCloudinary, cloudinary };
