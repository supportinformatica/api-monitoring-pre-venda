import { getSum } from '@src/modules/common/helpers';
import { DistanceService } from '@src/modules/common/services/distance-service';
import { CheckIn } from '@src/modules/database/models';
import { SaleTimeLine, TimeLine } from '../../interfaces/time-line';

function getLabelDistance(total: number): string {
  const oneKilometer = 1000;

  const kilometers = Math.round(total / oneKilometer);

  return `${kilometers} km`;
}

function getTotal(sales: SaleTimeLine[]): number {
  return getSum(
    sales.map(({ sale }) => {
      if (!sale) return 0;

      return sale.total;
    })
  );
}

async function getDistance(sales: SaleTimeLine[]) {
  if (!sales.length) return '0 km';

  const external = new DistanceService();

  const lastSale = sales.length - 1;

  const promises = sales.map((prev, index) => {
    if (index === lastSale) return Promise.resolve(0);

    const next = sales[index + 1];

    const destination = {
      lat: prev.lat,
      long: prev.long
    };

    const origin = {
      lat: next.lat,
      long: next.long
    };

    return external.getDistance(destination, origin);
  });

  return getLabelDistance(getSum(await Promise.all(promises)));
}

function formatSales(checkIn: CheckIn[]): SaleTimeLine[] {
  return checkIn.map(({ customer, sale: _sale, createdAt, lat, long }) => {
    const [time] = new Date(createdAt).toTimeString().split(' ');
    const sale = _sale ? { id: _sale.id, total: _sale.total } : undefined;

    return {
      sale,
      customer,
      lat,
      long,
      time
    };
  });
}

export async function formatTimeLine(data: CheckIn[]): Promise<TimeLine> {
  const sales = formatSales(data);
  const total = getTotal(sales);
  const distance = await getDistance(sales);

  return { distance, total, sales };
}
