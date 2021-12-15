import { NotFoundException } from '@nestjs/common';
import { Either } from '@src/shared/either';
import { CustomerById } from '../../interfaces/customer-by-id';

export type FindResponse = Either<NotFoundException, CustomerById>;

export interface CustomerServiceDTO {
  findById: (id: number, storeId: number) => Promise<FindResponse>;
}
