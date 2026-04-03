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
export const calculateBand = (averageScore: number): string => {
  if (averageScore >= 10) return '10-12';
  if (averageScore >= 9) return '9';
  if (averageScore >= 7) return '7-8';
  if (averageScore >= 5) return '5-6';
  if (averageScore >= 3) return '3-4';
  return 'M';
};

/**
 * Calculates the overall aggregate score across all criteria
 */
export const calculateAverage = (scores: Record<string, number>): number => {
  const values = Object.values(scores);
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return Number((sum / values.length).toFixed(2));
};

export default { calculateBand, calculateAverage };
