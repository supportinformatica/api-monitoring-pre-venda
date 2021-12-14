import { ICustomerSchema } from './sale-by-seller';

export interface SaleByIdProducts {
  quantity: number;
  grossValue: number;
  product: {
    id: number;
    image: string;
    defaultImage: string;
    name: string;
  };
}

export interface SaleByIdPayment {
  name: string;
}

export interface SaleById {
  date: string;
  total: number;
  discount: number;
  observation: string;
  products: SaleByIdProducts[];
  customer: ICustomerSchema;
  paymentMethod: SaleByIdPayment;
}
