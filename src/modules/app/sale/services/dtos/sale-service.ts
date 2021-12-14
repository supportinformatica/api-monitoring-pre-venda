import { SaleAndInfo } from '../../interfaces/sale-and-info';

export interface SaleServiceDTO {
  findInfoBySellerId: (
    sellerId: number,
    storeId: number,
    from?: string,
    to?: string
  ) => Promise<SaleAndInfo>;
}
