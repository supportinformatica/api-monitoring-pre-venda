import { ISale } from '@src/modules/database/interfaces';

export function getBeginningPeriod(sales: ISale[]): Date {
  return new Date(sales[0].date);
}
