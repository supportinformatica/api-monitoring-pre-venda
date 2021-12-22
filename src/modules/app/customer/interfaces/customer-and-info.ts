import { ICustomer } from '@src/modules/database/interfaces';

export interface CustomerAndInfo {
  customer: Pick<ICustomer, 'id' | 'name'>;
  ranking: number;
  totalSales: number;
  totalValue: number;
  maxValue: number;
}
