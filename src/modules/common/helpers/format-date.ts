export function formatDate(date: Date): string {
  const [usDate] = date.toISOString().split('T');

  return usDate.split('-').reverse().join('/');
}

export function formatDateDayAndMonth(date: Date): string {
  const [usDate] = date.toISOString().split('T');

  return usDate.split('-').reverse().slice(0, 2).join('/');
}
