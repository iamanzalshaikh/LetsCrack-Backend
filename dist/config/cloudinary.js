import { v2 as cloudinary } from "cloudinary";
import { env } from "./env.js";
import logger from "../utils/logger.js";
import streamifier from "streamifier";
cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (fileBuffer, options = {}) => {
    const { folder = 'lce-test-recordings', resource_type = 'auto' } = options;
    if (!fileBuffer || fileBuffer.length === 0) {
        logger.error('Cloudinary Upload Error: File buffer is empty');
        return null;
    }
    return new Promise((resolve) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            folder,
            resource_type,
        }, (error, result) => {
            if (error) {
                logger.error(`Cloudinary Upload Error: ${error.message}`);
                return resolve(null);
            }
            if (result) {
                return resolve(result.secure_url);
            }
            return resolve(null);
        });
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
};
export { uploadOnCloudinary, cloudinary };
//# sourceMappingURL=cloudinary.js.map