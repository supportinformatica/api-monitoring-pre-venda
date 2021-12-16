import { formatDate } from '@src/modules/common/helpers';
import { ISale } from '@src/modules/database/interfaces';
import { SaleById } from '../../interfaces/sale-by-id';

export function formatById(sale: ISale): SaleById {
  return {
    ...sale,
    date: formatDate(new Date(sale.date))
  };
}
