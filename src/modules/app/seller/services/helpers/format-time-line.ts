import { getSum } from '@src/modules/common/helpers';
import { DistanceService } from '@src/modules/common/services/distance-service';
import { ISale } from '@src/modules/database/interfaces';
import { SaleTimeLine, TimeLine } from '../../interfaces/time-line';

function getLabelDistance(total: number): string {
  const oneKilometer = 1000;

  const meters = total % oneKilometer;
  const kilometers = (total - meters) / oneKilometer;

  const metersPrefix = meters > 1 ? 'metros' : 'metro';

  const kilometersLabel = `${kilometers} km`;
  const metersLabel = `${meters} ${metersPrefix}`;

  if (!meters) return kilometersLabel;

  return `${kilometersLabel} e ${metersLabel}`;
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

export async function formatTimeLine(data: ISale[]): Promise<TimeLine> {
  const sales = formatSales(data);
  const distance = await getDistance(sales);

  return { sales, distance };
}
