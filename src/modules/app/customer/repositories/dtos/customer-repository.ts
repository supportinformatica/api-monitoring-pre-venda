import { ICustomer } from '@src/modules/database/interfaces';

export interface CustomerRepositoryDTO {
  findById: (id: number, storeId: number) => Promise<ICustomer | undefined>;
  findInfo: (storeId: number) => Promise<ICustomer[]>;
  findAllForStore: (storeId: number) => Promise<ICustomer[]>;
}
