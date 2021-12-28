import { ICustomerSchema } from './sale-by-seller';

export type PurchaseTypeSchema = 'PRE_SALE' | 'BUDGET';

export type PurchaseStatusSchema = 'SYNCHRONIZED' | 'APPROVED' | 'REJECTED';

export interface SaleByCustomer {
  id: number;
  date: string;
  total: number;
  purchaseType: PurchaseTypeSchema;
  purchaseStatus: PurchaseStatusSchema;
  seller: ICustomerSchema;
}
