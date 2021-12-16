import { Injectable } from '@nestjs/common';
import { CustomSaleRepository } from '../../sale/repositories';
import { PeriodOptions } from '../interfaces/period-options';
import { GraphicServiceDTO } from './dtos/graphic-services';
import { getPeriods } from './helpers/get-periods';
import { formatSaleGraphic } from './helpers/format-data';

@Injectable()
export class GraphicService implements GraphicServiceDTO {
  constructor(private readonly repository: CustomSaleRepository) {}

  public async saleBySeller(sellerId: number, storeId: number, options: PeriodOptions) {
    const periods = getPeriods(options);

    const promises = periods.map(({ from, to }) =>
      this.repository.findForGraphicBySellerId(sellerId, storeId, from, to)
    );

    return formatSaleGraphic(await Promise.all(promises), options.quantity);
  }
}
