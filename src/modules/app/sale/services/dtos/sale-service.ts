import { SaleAndInfo } from '../../interfaces/sale-and-info';
import { SaleBySeller } from '../../interfaces/sale-by-seller';
import { SalePerDay } from '../../interfaces/sale-per-day';

export interface SaleServiceDTO {
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
