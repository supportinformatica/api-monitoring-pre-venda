import { Injectable } from '@nestjs/common';
import { CustomSaleRepository } from '../repositories';
import { SaleServiceDTO } from './dtos/sale-service';
import { formatInfo } from './helpers/format-info';

@Injectable()
export class SaleService implements SaleServiceDTO {
  constructor(private readonly repository: CustomSaleRepository) {}

  public async findInfoBySellerId(sellerId: number, storeId: number, from?: string, to?: string) {
    return formatInfo(await this.repository.findInfoBySellerId(sellerId, storeId, from, to));
  }
}
