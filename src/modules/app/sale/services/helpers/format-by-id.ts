import { ISale } from '@src/modules/database/interfaces';
import { formatDate } from '@src/shared/format-date';
import { SaleById } from '../../interfaces/sale-by-id';

export function formatById(sale: ISale): SaleById {
  return {
    ...sale,
    date: formatDate(new Date(sale.date))
  };
}
