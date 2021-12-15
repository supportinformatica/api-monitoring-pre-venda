import { PeriodOptions } from '../../interfaces/period-options';

export interface GraphicServiceDTO {
  saleBySeller: (sellerId: number, storeId: number, options: PeriodOptions) => any;
}
