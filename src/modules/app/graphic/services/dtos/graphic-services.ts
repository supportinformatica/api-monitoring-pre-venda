import { PeriodOptions } from '../../interfaces/period-options';
import { SaleGraphicBySeller } from '../../interfaces/sale-graphic-by-seller';
import { PurchasesGraphic } from '../../interfaces/purchases-graphic-by-customer';

export interface GraphicServiceDTO {
  saleBySeller: (
    sellerId: number,
    storeId: number,
    options: PeriodOptions
  ) => Promise<SaleGraphicBySeller>;

  purchases: (
    customerId: number,
    storeId: number,
    options: PeriodOptions
  ) => Promise<PurchasesGraphic>;
}
