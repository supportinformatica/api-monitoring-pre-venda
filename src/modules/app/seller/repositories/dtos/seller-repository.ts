import { ISeller, ISellerCustomer } from '@src/modules/database/interfaces';

export interface SellerRepositoryDTO {
  findCustomers: (storeId: number) => Promise<ISellerCustomer[]>;
  findInfo: (storeId: number) => Promise<ISeller[]>;
  findById: (id: number, storeId: number) => Promise<ISeller | undefined>;
  findAllForStore: (storeId: number) => Promise<ISeller[]>;
}
