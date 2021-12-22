export function getDiffDays(beginningPeriod: Date, endPeriod: Date): number {
  return (endPeriod.valueOf() - beginningPeriod.valueOf()) / 24 / 60 / 60 / 1000;
}
