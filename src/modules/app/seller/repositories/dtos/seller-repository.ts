import { ISeller } from '@src/modules/database/interfaces';

export interface SellerRepositoryDTO {
  findInfo: (storeId: number) => Promise<ISeller[]>;
  findById: (id: number, storeId: number) => Promise<ISeller | undefined>;
  findAllForStore: (storeId: number) => Promise<ISeller[]>;
}
