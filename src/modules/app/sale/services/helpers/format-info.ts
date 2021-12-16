import { ISale } from '@src/modules/database/interfaces';
import { SaleAndInfo } from '../../interfaces/sale-and-info';

import * as Helpers from '@src/modules/common/helpers';
export function formatInfo(sales: ISale[]): SaleAndInfo {
  if (!sales.length) {
    return {
      beginningPeriod: Helpers.formatDate(new Date('2021-06-01')),
      endPeriod: Helpers.formatDate(new Date()),
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

  const mediaValue = Helpers.getMedia(values.length, totalValue);

  const beginningPeriod = Helpers.getBeginningPeriod(sales);

  const endPeriod = Helpers.getEndPeriod(sales);

  const diffDays = Helpers.getDiffDays(beginningPeriod, endPeriod);

  const totalSales = sales.length;

  const mediaSales = Helpers.getMedia(totalSales, diffDays);

  return {
    beginningPeriod: Helpers.formatDate(beginningPeriod),
    endPeriod: Helpers.formatDate(endPeriod),
    maxValue,
    mediaSales,
    totalSales,
    totalValue,
    mediaValue
  };
}
