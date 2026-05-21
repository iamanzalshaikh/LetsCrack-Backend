export type TestMode = 'practice' | 'simulation';
export type TestModule = 'listening' | 'reading' | 'writing' | 'speaking';
export type ModeAction = 'canRevisitTask' | 'canOverwriteSubmittedTask' | 'canUseHints' | 'canViewSampleResponses';
type ModuleRuleSet = Record<ModeAction, boolean>;
type ModeMatrix = Record<TestMode, Record<TestModule, ModuleRuleSet>>;
export declare const MODE_RULES: ModeMatrix;
export declare const isActionAllowed: (mode: TestMode | undefined, module: TestModule, action: ModeAction) => boolean;
declare const _default: {
    MODE_RULES: ModeMatrix;
    isActionAllowed: (mode: TestMode | undefined, module: TestModule, action: ModeAction) => boolean;
};
export default _default;
