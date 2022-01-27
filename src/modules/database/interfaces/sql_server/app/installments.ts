import { ICustomer } from '.';

export interface IInstallments {
  id: number;
  storeId: number;
  customerId: number;
  document: string;
  value: number;
  discount: number;
  dueDate: Date;

  customer: ICustomer;
}
