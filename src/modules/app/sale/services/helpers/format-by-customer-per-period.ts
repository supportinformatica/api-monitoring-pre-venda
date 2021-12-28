import { formatDate } from '@src/modules/common/helpers';
import { ISale, SaleStatus, SaleType } from '@src/modules/database/interfaces';
import { SaleStatusSchema, SaleTypeSchema } from '../../interfaces/sale-by-seller';
import { SaleByCustomer } from '../../interfaces/sales-by-customer-per-period';

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

function formatSale({ discount: _, ...sale }: ISale): SaleByCustomer {
  return {
    ...sale,
    date: formatDate(new Date(sale.date)),
    purchaseStatus: getStatus(sale.saleStatus),
    purchaseType: getType(sale.saleType)
  };
}

export function formatByCustomerPerPeriod(sales: ISale[]): SaleByCustomer[] {
  return sales.map(sale => formatSale(sale));
}
