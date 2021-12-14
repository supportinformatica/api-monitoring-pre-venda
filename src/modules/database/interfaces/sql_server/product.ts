import { ISaleProduct } from './sale-product';

export interface IProduct {
  id: number;
  storeId: number;
  name: string;
  isActive: boolean;

  image: string;
  defaultImage: string;

  sales: ISaleProduct[];
}
