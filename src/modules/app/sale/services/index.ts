import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomSaleRepository } from '../repositories';
import { SaleServiceDTO, FindResponse } from './dtos/sale-service';
import { formatInfoBySeller } from './helpers/format-info-by-seller';
import { formatInfoByCustomer } from './helpers/format-info-by-customer';
import { formatSalePerDay, formatPurchasesPerDay } from './helpers/format-info-per-day';
import { formatAllBySeller } from './helpers/format-all-by-seller';
import { formatById } from './helpers/format-by-id';
import { left, right } from '@src/shared/either';
import { formatByCustomerPerPeriod } from './helpers/format-by-customer-per-period';

@Injectable()
export class SaleService implements SaleServiceDTO {
  constructor(private readonly repository: CustomSaleRepository) {}

  public async findById(id: number, storeId: number): Promise<FindResponse> {
    const sale = await this.repository.findId(id, storeId);

    if (!sale) return left(new NotFoundException('Sale is not found'));

    return right(formatById(sale));
  }

  public async findPurchaseById(id: number, storeId: number): Promise<FindResponse> {
    const sale = await this.repository.findPurchaseById(id, storeId);

    if (!sale) return left(new NotFoundException('Sale is not found'));

    return right(formatById(sale));
  }

  public async findAllBySellerId(sellerId: number, storeId: number) {
    return formatAllBySeller(await this.repository.findAllBySellerId(sellerId, storeId));
  }

  public async findByCustomerPerPeriod(
    customerId: number,
    storeId: number,
    from?: string,
    to?: string
  ) {
    return formatByCustomerPerPeriod(
      await this.repository.findByCustomerPerPeriod(customerId, storeId, from, to)
    );
  }

  public async findInfoByStoreId(storeId: number, from?: string, to?: string) {
    return formatInfoBySeller(await this.repository.findInfoByStoreId(storeId, from, to), from, to);
  }

  public async findInfoBySellerId(sellerId: number, storeId: number, from?: string, to?: string) {
    return formatInfoBySeller(
      await this.repository.findInfoBySellerId(sellerId, storeId, from, to),
      from,
      to
    );
  }

  public async findInfoByCustomerId(
    customerId: number,
    storeId: number,
    from?: string,
    to?: string
  ) {
    return formatInfoByCustomer(
      await this.repository.findInfoByCustomerId(customerId, storeId, from, to),
      from,
      to
    );
  }

  public async findInfoByStoreIdPerDay(storeId: number, days = 7) {
    const promises = new Array(days).fill('').map((_, index) => {
      const perDay = new Date(new Date().setDate(new Date().getUTCDate() - index)).toISOString();

      return this.repository.findInfoByStoreId(storeId, perDay, perDay);
    });

    return formatSalePerDay(await Promise.all(promises));
  }

  public async findInfoBySellerIdPerDay(sellerId: number, storeId: number, days = 7) {
    const promises = new Array(days).fill('').map((_, index) => {
      const perDay = new Date(new Date().setDate(new Date().getUTCDate() - index)).toISOString();

      return this.repository.findInfoBySellerId(sellerId, storeId, perDay, perDay);
    });

    return formatSalePerDay(await Promise.all(promises));
  }

  public async findInfoByCustomerIdPerDay(customerId: number, storeId: number, days = 7) {
    const promises = new Array(days).fill('').map((_, index) => {
      const perDay = new Date(new Date().setDate(new Date().getUTCDate() - index)).toISOString();

      return this.repository.findInfoByCustomerId(customerId, storeId, perDay, perDay);
    });

    return formatPurchasesPerDay(await Promise.all(promises));
  }

  public async findLastFiveSalesByStoreId(storeId: number) {
    return (await this.repository.findLastFiveSalesByStoreId(storeId)).slice(0, 5);
  }
}
