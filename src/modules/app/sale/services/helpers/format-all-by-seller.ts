import { formatDate } from '@src/modules/common/helpers';
import { ISale, SaleStatus, SaleType } from '@src/modules/database/interfaces';
import { SaleBySeller, SaleStatusSchema, SaleTypeSchema } from '../../interfaces/sale-by-seller';

function getStatus(status: SaleStatus): SaleStatusSchema {
  const schema: { [key: string]: SaleStatusSchema } = {
    1: 'SYNCHRONIZED',
    2: 'APPROVED',
    3: 'REJECTED'
  };

  return schema[status];
}

function getType(type: SaleType): SaleTypeSchema {
  if (type === 'O') return 'BUDGET';

  return 'PRE_SALE';
}

function formatSale({ discount: _, ...sale }: ISale): SaleBySeller {
  return {
    ...sale,
    date: formatDate(new Date(sale.date)),
    saleStatus: getStatus(sale.saleStatus),
    saleType: getType(sale.saleType)
  };
}

export function formatAllBySeller(sales: ISale[]): SaleBySeller[] {
  return sales.map(sale => formatSale(sale));
}
