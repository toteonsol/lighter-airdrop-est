export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

export function calculateWeeksBetween(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.ceil(diffDays / 7);
}

export function estimateRank(percentageOfPool: number): string {
  // Power-law distribution estimation
  if (percentageOfPool >= 0.5) return 'Top 1';
  if (percentageOfPool >= 0.2) return 'Top 10';
  if (percentageOfPool >= 0.08) return 'Top 100';
  if (percentageOfPool >= 0.04) return 'Top 500';
  if (percentageOfPool >= 0.01) return 'Top 1,000';
  if (percentageOfPool >= 0.005) return 'Top 5,000';
  if (percentageOfPool >= 0.001) return 'Top 10,000';
  return 'Top 50,000+';
}
