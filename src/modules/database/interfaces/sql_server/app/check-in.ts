import { ICustomer } from './customer';
import { ISale } from './sale';
import { ISeller } from './seller';

export interface ICheckIn {
  id: number;
  storeId: number;
  sellerId: number;
  customerId: number;
  saleId: number;

  lat: string;
  long: string;
  createdAt: Date;

  customer: ICustomer;
  sale: ISale;
  seller: ISeller;
}
