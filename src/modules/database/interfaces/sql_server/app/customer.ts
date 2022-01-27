import { IInstallments } from './installments';
import { ISale } from './sale';
import { ISellerCustomer } from './seller-customer';

export type DocumentType = 'CPF' | 'CNPJ';

export interface ICustomer {
  id: number;
  storeId: number;
  name: string;
  email: string;
  phone: string;
  document: string;
  documentType: DocumentType;
  observation: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  zipCode: string;
  complement: string;
  isWholesale: boolean;
  cashPaymentOnly: boolean;
  hasRestriction: boolean;
  hasInstallments: number;

  installments: IInstallments[];
  sellers: ISellerCustomer[];
  sales: ISale[];
}
