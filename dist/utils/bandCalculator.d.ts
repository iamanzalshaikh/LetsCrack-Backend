/**
 * Calculates the final CLB band based on the average criterion score (1-12)
 *
 * Average Score Range -> CLB Band
 * 10 - 12 -> 10-12 (Expert)
 * 9 - 9.9 -> 9 (Advanced)
 * 7 - 8.9 -> 7-8 (Upper Intermediate)
 * 5 - 6.9 -> 5-6 (Intermediate)
 * 3 - 4.9 -> 3-4 (Elementary)
 * < 2 -> M (Minimal)
 */
export declare const calculateBand: (averageScore: number) => string;
/**
 * Calculates the overall aggregate score across all criteria
 */
export declare const calculateAverage: (scores: Record<string, number>) => number;
declare const _default: {
    calculateBand: (averageScore: number) => string;
    calculateAverage: (scores: Record<string, number>) => number;
};
export default _default;
