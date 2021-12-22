import { ISeller } from '@src/modules/database/interfaces';

export interface AdminRepositoryDTO {
  findById: (id: number, storeId: number) => Promise<ISeller | undefined>;
}
