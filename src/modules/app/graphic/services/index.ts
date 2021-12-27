import { Injectable } from '@nestjs/common';
import { CustomSaleRepository } from '../../sale/repositories';
import { PeriodOptions } from '../interfaces/period-options';
import { GraphicServiceDTO } from './dtos/graphic-services';
import { getPeriods } from './helpers/get-periods';
import {
  formatSaleGraphicBySeller,
  formatPurchasesGraphic,
  formatSaleGraphicByStore
} from './helpers/format-data';

@Injectable()
export class GraphicService implements GraphicServiceDTO {
  constructor(private readonly repository: CustomSaleRepository) {}

  public async saleBySeller(sellerId: number, storeId: number, options: PeriodOptions) {
    const periods = getPeriods(options);

    const promises = periods.map(({ from, to }) =>
      this.repository.findForGraphicBySellerId(sellerId, storeId, from, to)
    );

    return formatSaleGraphicBySeller(await Promise.all(promises), options.quantity);
  }

  public async saleByStore(storeId: number, options: PeriodOptions) {
    const periods = getPeriods(options);

    const promises = periods.map(({ from, to }) =>
      this.repository.findForGraphicByStoreId(storeId, from, to)
    );

    return formatSaleGraphicByStore(await Promise.all(promises), options.quantity);
  }

  public async purchases(customerId: number, storeId: number, options: PeriodOptions) {
    const periods = getPeriods(options);

    const promises = periods.map(({ from, to }) =>
      this.repository.findForGraphicByCustomerId(customerId, storeId, from, to)
    );

    return formatPurchasesGraphic(await Promise.all(promises), options.quantity);
  }
}
