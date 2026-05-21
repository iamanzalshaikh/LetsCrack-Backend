import cron from "node-cron";
import TestSession from "../models/TestSession.js";
import logger from "../utils/logger.js";
import { tryDestroyCloudinaryUrl } from "../utils/cloudinaryMedia.js";
const deleteRawArtifacts = async (session) => {
    const audioUrls = (session.speakingRecordings || [])
        .map((r) => r.audioUrl)
        .filter(Boolean);
    for (const url of audioUrls) {
        await tryDestroyCloudinaryUrl(url);
    }
    session.writingResponses = (session.writingResponses || []).map((r) => ({
        ...(r.toObject?.() ?? r),
        responseText: undefined,
        aiAnalysis: undefined,
    }));
    session.speakingRecordings = (session.speakingRecordings || []).map((r) => ({
        ...(r.toObject?.() ?? r),
        audioUrl: undefined,
        transcript: undefined,
        aiAnalysis: undefined,
    }));
    session.purgedAt = new Date();
    await session.save();
};
export const runRetentionPurge = async () => {
    const now = new Date();
    const sessions = await TestSession.find({
        purgeAt: { $lte: now },
        purgedAt: { $exists: false },
    });
    for (const session of sessions) {
        try {
            await deleteRawArtifacts(session);
            logger.info(`Retention purge completed for session ${session._id}`);
        }
        catch (error) {
            logger.error(`Retention purge failed for session ${session._id}`, error);
        }
    }
};
export const startRetentionPurgeWorker = () => {
    cron.schedule("0 * * * *", async () => {
        try {
            await runRetentionPurge();
        }
        catch (error) {
            logger.error("Retention purge worker failed", error);
        }
    });
    logger.info("Retention purge worker scheduled: 0 * * * *");
};
export default { startRetentionPurgeWorker, runRetentionPurge };
//# sourceMappingURL=retention.worker.js.map