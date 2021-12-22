import { QueryPeriod } from '../dtos/sale-repository';

export function getQueryPeriod(setFrom?: string, setTo?: string): QueryPeriod {
  const query = 'Sale.date BETWEEN :from AND :to';
  const thirtyDays = 2592000000;

  let from = new Date(new Date().valueOf() - thirtyDays).toISOString();
  let to = new Date().toISOString();

  if (setFrom && setTo) {
    (from = setFrom), (to = setTo);
  }

  const params = { from, to };
  return { query, params };
}
