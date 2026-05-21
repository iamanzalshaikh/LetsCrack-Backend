export type TestMode = 'practice' | 'simulation';
export type TestModule = 'listening' | 'reading' | 'writing' | 'speaking';
export type ModeAction =
  | 'canRevisitTask'
  | 'canOverwriteSubmittedTask'
  | 'canUseHints'
  | 'canViewSampleResponses';

type ModuleRuleSet = Record<ModeAction, boolean>;
type ModeMatrix = Record<TestMode, Record<TestModule, ModuleRuleSet>>;

export const MODE_RULES: ModeMatrix = {
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

export const isActionAllowed = (
  mode: TestMode = 'practice',
  module: TestModule,
  action: ModeAction,
) => {
  return MODE_RULES[mode][module][action];
};

export default { MODE_RULES, isActionAllowed };
