import { IProduct } from './product';
import { ISale } from './sale';

export interface ISaleProduct {
  id: number;
  storeId: number;
  saleId: number;
  productId: number;
  quantity: number;
  grossValue: number;
  netValue: number;

  product: IProduct;
  sale: ISale;
}
