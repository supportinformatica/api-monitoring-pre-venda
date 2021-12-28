import { SaleById } from './sale-by-id';
import { ICustomerSchema } from './sale-by-seller';

export type PurchaseSeller = ICustomerSchema;

export interface PurchaseById extends Omit<SaleById, 'customer'> {
  seller: PurchaseSeller;
}
