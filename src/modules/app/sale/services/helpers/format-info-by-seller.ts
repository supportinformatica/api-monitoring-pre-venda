import { ISale } from '@src/modules/database/interfaces';
import { SaleAndInfoBySeller } from '../../interfaces/sale-and-info';

import * as Helpers from '@src/modules/common/helpers';

export function formatInfoBySeller(
  sales: ISale[],
  from?: string,
  to?: string
): SaleAndInfoBySeller {
  const thirtyDays = 2592000000;

  let fromToFormat: Date = new Date(new Date().valueOf() - thirtyDays);
  let toToFormat: Date = new Date();

  if (from && to) {
    const [fromUsDate] = from.split('T');
    const [toUsDate] = to.split('T');

    (fromToFormat = new Date(fromUsDate)), (toToFormat = new Date(toUsDate));
  }

  if (!sales.length) {
    return {
      beginningPeriod: Helpers.formatDate(fromToFormat),
      endPeriod: Helpers.formatDate(toToFormat),
      maxValue: 0,
      mediaSales: 0,
      totalSales: 0,
      totalValue: 0,
      mediaValue: 0
    };
  }

  const values = sales.map(sale => sale.total);

  const maxValue = Helpers.getMax(values);

  const totalValue = Helpers.getSum(values);

  const mediaValue = Helpers.getMedia(totalValue, values.length);

  const beginningPeriod = Helpers.formatDate(fromToFormat);

  const endPeriod = Helpers.formatDate(toToFormat);

  const diffDays = Helpers.getDiffDays(fromToFormat, toToFormat);

  const totalSales = sales.length;

  const mediaSales = Helpers.getMedia(totalSales, diffDays);

  return {
    beginningPeriod,
    endPeriod,
    maxValue,
    mediaSales,
    totalSales,
    totalValue,
    mediaValue
  };
}
