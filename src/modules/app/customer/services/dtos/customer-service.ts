import { NotFoundException } from '@nestjs/common';
import { Either } from '@src/shared/either';
import { CustomerById } from '../../interfaces/customer-by-id';
import { CustomerAndInfo } from '../../interfaces/customer-and-info';

export type FindResponse = Either<NotFoundException, CustomerById>;

export interface CustomerServiceDTO {
  findInfo: (storeId: number) => Promise<CustomerAndInfo[]>;
  findById: (id: number, storeId: number) => Promise<FindResponse>;
}
