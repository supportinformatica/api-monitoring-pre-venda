import { NotFoundException } from '@nestjs/common';
import { ISeller } from '@src/modules/database/interfaces';
import { Either } from '@src/shared/either';

export type FindResponse = Either<NotFoundException, ISeller>;

export interface AdminServiceDTO {
  findById: (id: number, storeId: number) => Promise<FindResponse>;
}
