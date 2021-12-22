export function getMax(values: number[]): number {
  if (!values.length) return 0;

  return values.reduce((max, curr) => Math.max(max, curr));
}
