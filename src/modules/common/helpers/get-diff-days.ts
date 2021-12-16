export function getDiffDays(start: Date, end: Date): number {
  return (start.valueOf() - end.valueOf()) / 24 / 60 / 60 / 1000;
}
