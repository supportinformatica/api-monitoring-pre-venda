import { ISale } from '@src/modules/database/interfaces';
import { SaleAndInfo } from '../../interfaces/sale-and-info';
import { SalePerDay } from '../../interfaces/sale-per-day';

export interface SaleServiceDTO {
  findAllBySellerId: (sellerId: number, storeId: number) => Promise<ISale[]>;

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
