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
export default { MODE_RULES, isActionAllowed };
//# sourceMappingURL=modeRules.js.map