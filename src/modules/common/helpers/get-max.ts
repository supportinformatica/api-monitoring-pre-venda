export function getMax(values: number[]): number {
  return values.reduce((max, curr) => Math.max(max, curr));
}
