export type TestMode = 'practice' | 'simulation';
export type TestModule = 'listening' | 'reading' | 'writing' | 'speaking';
export type ModeAction = 'canRevisitTask' | 'canOverwriteSubmittedTask' | 'canUseHints' | 'canViewSampleResponses';
type ModuleRuleSet = Record<ModeAction, boolean>;
type ModeMatrix = Record<TestMode, Record<TestModule, ModuleRuleSet>>;
export declare const MODE_RULES: ModeMatrix;
export declare const isActionAllowed: (mode: TestMode | undefined, module: TestModule, action: ModeAction) => boolean;
type WritingRow = {
    submittedAt?: Date | string | null;
    aiBand?: number | null;
};
type SpeakingRow = {
    aiBand?: number | null;
};
/** When false (default), writing/speaking submissions are saved but never sent to Gemini. */
export declare function isAiGradingEnabled(): boolean;
export declare function countGradedWriting(responses: WritingRow[]): number;
export declare function countGradedSpeaking(recordings: SpeakingRow[]): number;
declare const _default: {
    MODE_RULES: ModeMatrix;
    isActionAllowed: (mode: TestMode | undefined, module: TestModule, action: ModeAction) => boolean;
    isAiGradingEnabled: typeof isAiGradingEnabled;
    countGradedWriting: typeof countGradedWriting;
    countGradedSpeaking: typeof countGradedSpeaking;
};
export default _default;
