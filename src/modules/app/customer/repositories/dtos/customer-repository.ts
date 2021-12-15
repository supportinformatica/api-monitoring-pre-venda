import { ICustomer } from '@src/modules/database/interfaces';

export interface CustomerRepositoryDTO {
  findById: (id: number, storeId: number) => Promise<ICustomer | undefined>;
}
