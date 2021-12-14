export function formatDate(date: Date): string {
  const [usDate] = date.toISOString().split('T');

  return usDate.split('-').reverse().join('/');
}
