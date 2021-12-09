import { ISale } from './sale';
import { ISellerCustomer } from './seller-customer';

export interface ISeller {
  id: number;
  storeId: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  maxDiscount: number;
  isActive: boolean;
  canChangePrice: boolean;
  useWallet: boolean;
  admin: boolean;

  customers: ISellerCustomer[];
  sales: ISale[];
}
