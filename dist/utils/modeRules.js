import { env } from '../config/env.js';
export const MODE_RULES = {
    practice: {
        listening: {
            canRevisitTask: true,
            canOverwriteSubmittedTask: true,
            canUseHints: true,
            canViewSampleResponses: true,
        },
        reading: {
            canRevisitTask: true,
            canOverwriteSubmittedTask: true,
            canUseHints: true,
            canViewSampleResponses: true,
        },
        writing: {
            canRevisitTask: true,
            canOverwriteSubmittedTask: true,
            canUseHints: true,
            canViewSampleResponses: true,
        },
        speaking: {
            canRevisitTask: true,
            canOverwriteSubmittedTask: true,
            canUseHints: true,
            canViewSampleResponses: true,
        },
    },
    simulation: {
        listening: {
            canRevisitTask: false,
            canOverwriteSubmittedTask: false,
            canUseHints: false,
            canViewSampleResponses: false,
        },
        reading: {
            canRevisitTask: false,
            canOverwriteSubmittedTask: false,
            canUseHints: false,
            canViewSampleResponses: false,
        },
        writing: {
            canRevisitTask: false,
            canOverwriteSubmittedTask: false,
            canUseHints: false,
            canViewSampleResponses: false,
        },
        speaking: {
            canRevisitTask: false,
            canOverwriteSubmittedTask: false,
            canUseHints: false,
            canViewSampleResponses: false,
        },
    },
};
export const isActionAllowed = (mode = 'practice', module, action) => {
    return MODE_RULES[mode][module][action];
};
/** When false (default), writing/speaking submissions are saved but never sent to Gemini. */
export function isAiGradingEnabled() {
    return env.AI_GRADING_ENABLED;
}
export function countGradedWriting(responses) {
    if (!isAiGradingEnabled()) {
        return responses.filter((r) => Boolean(r.submittedAt)).length;
    }
    return responses.filter((r) => (r.aiBand || 0) > 0).length;
}
export function countGradedSpeaking(recordings) {
    if (!isAiGradingEnabled()) {
        return recordings.length;
    }
    return recordings.filter((r) => (r.aiBand || 0) > 0).length;
}
export default { MODE_RULES, isActionAllowed, isAiGradingEnabled, countGradedWriting, countGradedSpeaking };
//# sourceMappingURL=modeRules.js.map