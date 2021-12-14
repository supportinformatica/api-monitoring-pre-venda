import { QueryPeriod } from '../dtos/sale-repository';

export function getQueryPeriod(setFrom?: string, setTo?: string): QueryPeriod {
  const query = 'Sale.date BETWEEN :from AND :to';

  let from = new Date('2021-06-01').toISOString();
  let to = new Date().toISOString();

  if (setFrom && setTo) {
    (from = setFrom), (to = setTo);
  }

  const params = { from, to };
  return { query, params };
}
