import { ISeller } from '@src/modules/database/interfaces';

export interface UserRepositoryDTO {
  findById: (id: number, storeId: number) => Promise<ISeller | undefined>;
}
