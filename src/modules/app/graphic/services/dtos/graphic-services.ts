import { PeriodOptions } from '../../interfaces/period-options';
import { SaleGraphicBySeller } from '../../interfaces/sale-graphic-by-seller';
import { PurchasesGraphic } from '../../interfaces/purchases-graphic-by-customer';
import { SaleGraphicByStore } from '../../interfaces/sale-graphic-by-store';

export interface GraphicServiceDTO {
  saleBySeller: (
    sellerId: number,
    storeId: number,
    options: PeriodOptions
  ) => Promise<SaleGraphicBySeller>;

  saleByStore: (storeId: number, options: PeriodOptions) => Promise<SaleGraphicByStore>;

  purchases: (
    customerId: number,
    storeId: number,
    options: PeriodOptions
  ) => Promise<PurchasesGraphic>;
}
