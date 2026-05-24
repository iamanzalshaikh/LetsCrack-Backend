import { v2 as cloudinary } from "cloudinary";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import logger from "./logger.js";
/**
 * Student speaking recordings — stored in Cloudinary.
 */
export async function uploadStudentSpeakingAudio(fileBuffer, studentId, testSetNumber, taskNumber, subTask) {
    const part = taskNumber === 5 && (subTask === "A" || subTask === "B") ? `-${subTask.toLowerCase()}` : "";
    const safeId = String(studentId).replace(/[^a-zA-Z0-9-]/g, "");
    const folder = `lce-student-recordings/${safeId}/set-${testSetNumber}/task-${taskNumber}${part}`;
    // WebM audio files must be uploaded with resource_type: 'video' in Cloudinary
    const url = await uploadOnCloudinary(fileBuffer, { folder, resource_type: "video" });
    if (!url) {
        throw new Error("Failed to upload audio to Cloudinary");
    }
    return url;
}
/**
 * Best-effort delete for retention purge (Cloudinary URLs only).
 */
export async function tryDestroyCloudinaryUrl(url) {
    if (!url || !url.includes("res.cloudinary.com"))
        return;
    const parsed = parseCloudinaryUrl(url);
    if (!parsed) {
        logger.warn("Retention: could not parse Cloudinary public_id", { preview: url.slice(0, 100) });
        return;
    }
    try {
        const res = await cloudinary.uploader.destroy(parsed.publicId, { resource_type: parsed.resourceType });
        if (res?.result !== "ok" && res?.result !== "not found") {
            logger.warn("Cloudinary destroy", { publicId: parsed.publicId, result: res?.result });
        }
    }
    catch (e) {
        logger.warn("Cloudinary destroy failed", { publicId: parsed.publicId, error: e });
    }
}
function parseCloudinaryUrl(url) {
    try {
        const u = new URL(url);
        if (!u.hostname.includes("res.cloudinary.com"))
            return null;
        const m = u.pathname.match(/\/(video|image|raw)\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
        if (!m)
            return null;
        return { resourceType: m[1], publicId: decodeURIComponent(m[2]) };
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=cloudinaryMedia.js.map