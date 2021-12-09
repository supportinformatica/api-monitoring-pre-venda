import { ISaleProduct } from './sale-product';

export interface IProduct {
  id: number;
  storeId: number;
  name: string;
  isActive: boolean;

  sales: ISaleProduct[];
}
