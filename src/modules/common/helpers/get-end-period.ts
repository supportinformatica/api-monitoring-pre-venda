import { ISale } from '@src/modules/database/interfaces';

export function getEndPeriod(sales: ISale[]): Date {
  return new Date(sales[sales.length - 1].date);
}
