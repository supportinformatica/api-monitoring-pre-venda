import { ICustomer } from './customer';
import { ISeller } from './seller';

export interface ISellerCustomer {
  customerId: number;
  sellerId: number;
  storeId: number;

  customer: ICustomer;
  seller: ISeller;
}
