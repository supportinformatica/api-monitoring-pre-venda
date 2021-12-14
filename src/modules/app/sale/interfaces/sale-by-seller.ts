export type SaleTypeSchema = 'PRE_SALE' | 'BUDGET';

export type SaleStatusSchema = 'SYNCHRONIZED' | 'APPROVED' | 'REJECTED';

export interface ICustomerSchema {
  id: number;
  name: string;
}

export interface SaleBySeller {
  id: number;
  date: string;
  total: number;
  saleType: SaleTypeSchema;
  saleStatus: SaleStatusSchema;
  customer: ICustomerSchema;
}
