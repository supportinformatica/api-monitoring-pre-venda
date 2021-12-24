import { NotFoundException } from '@nestjs/common';
import { Store } from '@src/modules/database/models';
import { Either } from '@src/shared/either';
import { StoreAndInfo } from '../../interfaces/store-and-info';

export type FindResponse = Either<NotFoundException, Store>;

export interface StoreServiceDTO {
  findById: (storeId: number) => Promise<FindResponse>;
  findInfo: (storeId: number) => Promise<StoreAndInfo>;
}
