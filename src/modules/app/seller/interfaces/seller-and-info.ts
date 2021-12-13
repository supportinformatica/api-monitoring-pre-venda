import { ISeller } from '@src/modules/database/interfaces';

export type Seller = Pick<ISeller, 'id' | 'email' | 'name'>;

export interface ISellerAndInfo {
  seller: Seller;
  totalCustomers: number;
  totalSales: number;
  totalValue: number;
  ranking: number;
}
