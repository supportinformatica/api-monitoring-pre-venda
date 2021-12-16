export function getSum(values: number[]): number {
  if (!values.length) return 0;

  return values.reduce((acc, curr) => acc + curr);
}
