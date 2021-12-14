import { ISale } from '@src/modules/database/interfaces';
import { SalePerDayData, SalePerDay } from '../../interfaces/sale-per-day';

function formatDay(index: number): string {
  const date = new Date(new Date().setDate(new Date().getUTCDate() - index));

  const [usDate] = date.toISOString().split('T');

  return usDate.split('-').reverse().slice(0, 2).join('/');
}

function getMax(sales: SalePerDayData[]): number {
  if (!sales.length) return 10;

  const max = sales.map(({ quantity }) => quantity).reduce((max, curr) => Math.max(max, curr));

  if (!max) return 10;

  return max;
}

function formatSaleDataPerDay(salesPerDay: ISale[][]): SalePerDayData[] {
  return salesPerDay
    .map((sales, index) => {
      return {
        quantity: sales.length,
        date: formatDay(index)
      };
    })
    .reverse();
}

export function formatSalePerDay(salesPerDay: ISale[][]): SalePerDay {
  const sales = formatSaleDataPerDay(salesPerDay);
  const max = getMax(sales);

  return { max, sales };
}
