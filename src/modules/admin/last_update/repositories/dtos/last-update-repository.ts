import { ILastUpdate } from '@src/modules/database/interfaces';

export interface LastUpdateRepositoryDTO {
  findAll: () => Promise<ILastUpdate[]>;
}
