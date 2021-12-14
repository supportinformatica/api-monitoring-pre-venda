import { ICustomer } from './customer';
import { IPaymentMethod } from './payment-method';
import { ISaleProduct } from './sale-product';
import { ISeller } from './seller';

export type SaleType = 'P' | 'O';

export type SaleStatus = 1 | 2 | 3;

export interface ISale {
  id: number;
  budgetId: number;
  storeId: number;
  sellerId: number;
  customerId: number;
  paymentId: number;
  date: Date;
  total: number;
  discount: number;
  saleStatus: SaleStatus;
  observation: string;
  concluded: boolean;
  deleted: boolean;
  saleType: SaleType;

  products: ISaleProduct[];
  customer: ICustomer;
  paymentMethod: IPaymentMethod;
  seller: ISeller;
}
