import { NotFoundException } from '@nestjs/common';
import { Either } from '@src/shared/either';
import { SaleAndInfo } from '../../interfaces/sale-and-info';
import { SaleById } from '../../interfaces/sale-by-id';
import { SaleBySeller } from '../../interfaces/sale-by-seller';
import { SalePerDay } from '../../interfaces/sale-per-day';

export type FindResponse = Either<NotFoundException, SaleById>;

export interface SaleServiceDTO {
  findById: (id: number, storeId: number) => Promise<FindResponse>;

  findAllBySellerId: (sellerId: number, storeId: number) => Promise<SaleBySeller[]>;

  findInfoBySellerId: (
    sellerId: number,
    storeId: number,
    from?: string,
    to?: string
  ) => Promise<SaleAndInfo>;

  findInfoBySellerIdPerDay: (
    sellerId: number,
    storeId: number,
    days: number
  ) => Promise<SalePerDay>;
}
