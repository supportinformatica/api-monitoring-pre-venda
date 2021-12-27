import { NotFoundException } from '@nestjs/common';
import { Either } from '@src/shared/either';
import { SaleAndInfoByCustomer, SaleAndInfoBySeller } from '../../interfaces/sale-and-info';
import { SaleById } from '../../interfaces/sale-by-id';
import { SaleBySeller } from '../../interfaces/sale-by-seller';
import { SalePerDay, PurchasesPerDay } from '../../interfaces/sale-per-day';
import { LastFiveSales } from '../../interfaces/last-five-sales';

export type FindResponse = Either<NotFoundException, SaleById>;

export interface SaleServiceDTO {
  findById: (id: number, storeId: number) => Promise<FindResponse>;

  findLastFiveSalesByStoreId: (storeId: number) => Promise<LastFiveSales[]>;

  findAllBySellerId: (sellerId: number, storeId: number) => Promise<SaleBySeller[]>;

  findInfoBySellerId: (
    sellerId: number,
    storeId: number,
    from?: string,
    to?: string
  ) => Promise<SaleAndInfoBySeller>;

  findInfoByCustomerId: (
    customerId: number,
    storeId: number,
    from?: string,
    to?: string
  ) => Promise<SaleAndInfoByCustomer>;

  findInfoBySellerIdPerDay: (
    sellerId: number,
    storeId: number,
    days: number
  ) => Promise<SalePerDay>;

  findInfoByCustomerIdPerDay: (
    customerId: number,
    storeId: number,
    days: number
  ) => Promise<PurchasesPerDay>;
}
