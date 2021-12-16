export function getMedia(total: number, per: number): number {
  if (!per) return total;

  return Number((total / per).toFixed(2));
}
