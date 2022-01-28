import { ISale } from '@src/modules/database/interfaces';
import { SaleTimeLine, TimeLine } from '../../interfaces/time-line';

function formatSales(sales: ISale[]): SaleTimeLine[] {
  return sales.map(({ id, customer, total, createdAt, lat, long }) => {
    const [time] = new Date(createdAt).toTimeString().split(' ');

    return {
      id,
      customer,
      total,
      lat,
      long,
      time
    };
  });
}

export function formatTimeLine(sales: ISale[]): TimeLine {
  return {
    sales: formatSales(sales)
  };
}
