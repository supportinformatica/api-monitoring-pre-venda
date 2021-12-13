import { NotFoundException } from '@nestjs/common';
import { Either } from '@src/shared/either';
import { ISellerAndInfo, Seller } from '../../interfaces/seller-and-info';

export type FindResponse = Either<NotFoundException, Seller>;
export interface SellerServiceDTO {
  findInfo: (storeId: number) => Promise<ISellerAndInfo[]>;
  findById: (id: number, storeId: number) => Promise<FindResponse>;
}
