import { env } from '../config/env.js';

type WritingRow = { submittedAt?: Date | string | null; aiBand?: number | null };
type SpeakingRow = { aiBand?: number | null };

/** When false (default), writing/speaking submissions are saved but never sent to Gemini. */
export function isAiGradingEnabled(): boolean {
  return env.AI_GRADING_ENABLED;
}

export function countGradedWriting(responses: WritingRow[]): number {
  if (!isAiGradingEnabled()) {
    return responses.filter((r) => Boolean(r.submittedAt)).length;
  }
  return responses.filter((r) => (r.aiBand || 0) > 0).length;
}

export function countGradedSpeaking(recordings: SpeakingRow[]): number {
  if (!isAiGradingEnabled()) {
    return recordings.length;
  }
  return recordings.filter((r) => (r.aiBand || 0) > 0).length;
}
