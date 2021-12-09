import { ISale } from './sale';

export interface IPaymentMethod {
  id: number;
  name: string;
  code: number;
  observation: string;

  sales: ISale[];
}
