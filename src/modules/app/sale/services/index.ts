import { Injectable } from '@nestjs/common';
import { CustomSaleRepository } from '../repositories';
import { SaleServiceDTO } from './dtos/sale-service';
import { formatInfo } from './helpers/format-info';
import { formatSalePerDay } from './helpers/format-info-per-day';

@Injectable()
export class SaleService implements SaleServiceDTO {
  constructor(private readonly repository: CustomSaleRepository) {}

  public findAllBySellerId(sellerId: number, storeId: number) {
    return this.repository.findAllBySellerId(sellerId, storeId);
  }

  public async findInfoBySellerId(sellerId: number, storeId: number, from?: string, to?: string) {
    return formatInfo(await this.repository.findInfoBySellerId(sellerId, storeId, from, to));
  }

  public async findInfoBySellerIdPerDay(sellerId: number, storeId: number, days = 7) {
    const promises = new Array(days).fill('').map((_, index) => {
      const perDay = new Date(new Date().setDate(new Date().getUTCDate() - index)).toISOString();

      return this.repository.findInfoBySellerId(sellerId, storeId, perDay, perDay);
    });

    return formatSalePerDay(await Promise.all(promises));
  }
}
