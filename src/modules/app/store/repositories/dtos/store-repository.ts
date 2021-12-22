import { IStore } from '@src/modules/database/interfaces';

export interface StoreRepositoryDTO {
  findById: (storeId: number) => Promise<IStore | undefined>;
}
