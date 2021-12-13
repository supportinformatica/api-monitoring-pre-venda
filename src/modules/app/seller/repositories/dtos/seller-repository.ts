import { ISeller } from '@src/modules/database/interfaces';

export interface SellerRepositoryDTO {
  findInfo: (storeId: number) => Promise<ISeller[]>;
}
