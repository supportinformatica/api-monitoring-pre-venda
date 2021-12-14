import { SaleAndInfo } from '../../interfaces/sale-and-info';
import { SalePerDay } from '../../interfaces/sale-per-day';

export interface SaleServiceDTO {
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
