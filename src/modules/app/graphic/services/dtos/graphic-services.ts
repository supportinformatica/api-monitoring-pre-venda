import { PeriodOptions } from '../../interfaces/period-options';
import { SaleGraphicBySeller } from '../../interfaces/sale-graphic-by-seller';

export interface GraphicServiceDTO {
  saleBySeller: (
    sellerId: number,
    storeId: number,
    options: PeriodOptions
  ) => Promise<SaleGraphicBySeller>;
}
