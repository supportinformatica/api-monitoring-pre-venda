import { ISale } from '@src/modules/database/interfaces';
import { SaleAndInfoByCustomer } from '../../interfaces/sale-and-info';

import * as Helpers from '@src/modules/common/helpers';

export function formatInfoByCustomer(
  sales: ISale[],
  from?: string,
  to?: string
): SaleAndInfoByCustomer {
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
      mediaPurchases: 0,
      totalPurchases: 0,
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

  const totalPurchases = sales.length;

  const mediaPurchases = Helpers.getMedia(totalPurchases, diffDays);

  return {
    beginningPeriod,
    endPeriod,
    maxValue,
    mediaPurchases,
    totalPurchases,
    totalValue,
    mediaValue
  };
}
