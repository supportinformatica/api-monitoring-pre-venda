import { NotFoundException } from '@nestjs/common';
import { Either } from '@src/shared/either';
import { ISellerAndInfo, Seller } from '../../interfaces/seller-and-info';
import { TimeLine } from '../../interfaces/time-line';

export type FindResponse = Either<NotFoundException, Seller>;
export interface SellerServiceDTO {
  findTimeLine: (id: number, storeId: number) => Promise<TimeLine>;
  findInfo: (storeId: number) => Promise<ISellerAndInfo[]>;
  findById: (id: number, storeId: number) => Promise<FindResponse>;
}
