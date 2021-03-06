import { Injectable, NotFoundException } from '@nestjs/common';
import { ISale, ISeller } from '@src/modules/database/interfaces';
import { left, right } from '@src/shared/either';
import { CustomCheckInRepository } from '../../check-in/repositories';
import { CustomSaleRepository } from '../../sale/repositories';
import { ISellerAndInfo } from '../interfaces/seller-and-info';
import { Settings } from '../interfaces/settings';
import { TimeLine } from '../interfaces/time-line';
import { CustomSellerRepository } from '../repositories';
import {
  SellerServiceDTO,
  FindResponse,
  FindSettings,
  ToggleResponse,
  SettingProperty,
  DiscountResponse
} from './dtos/seller-service';
import { formatTimeLine } from './helpers/format-time-line';

@Injectable()
export class SellerService implements SellerServiceDTO {
  constructor(
    private readonly repository: CustomSellerRepository,
    private readonly saleRepository: CustomSaleRepository,
    private readonly checkInRepository: CustomCheckInRepository
  ) {}

  public async changeMaxDiscount(
    id: number,
    storeId: number,
    discount: number
  ): Promise<DiscountResponse> {
    const seller = await this.repository.findById(id, storeId);

    if (!seller) {
      return left(new NotFoundException('Seller is not found'));
    }

    await this.repository.changeMaxDiscount(id, storeId, discount);

    return right(discount);
  }

  public async toggleSetting(
    id: number,
    storeId: number,
    setting: SettingProperty
  ): Promise<ToggleResponse> {
    const seller = await this.repository.findSettings(id, storeId);

    if (!seller) {
      return left(new NotFoundException('Seller is not found'));
    }

    const change = !seller[setting];

    const overwrite = JSON.parse(`{"${setting}": ${change}}`);
    const merged: Settings = { ...seller, ...overwrite };

    await this.repository.toggleSettings(id, storeId, merged);

    return right(change);
  }

  private getTotalValue(sales: ISale[]): number {
    if (!sales.length) return 0;

    return sales.map(sale => sale.total).reduce((prev, curr) => prev + curr);
  }

  private getRanking(sellers: ISellerAndInfo[]): ISellerAndInfo[] {
    return sellers
      .sort((prev, next) => next.totalSales - prev.totalSales)
      .map((seller, index) => ({
        ...seller,
        ranking: index + 1
      }));
  }

  private getInfo({ sales, customers, id, email, name }: ISeller): ISellerAndInfo {
    const totalValue = this.getTotalValue(sales);
    const totalSales = sales.length;
    const totalCustomers = customers.length;
    const seller = { id, email, name };

    return {
      seller,
      totalCustomers,
      totalSales,
      totalValue,
      ranking: 0
    };
  }

  public async findTimeLine(id: number, date: string, storeId: number): Promise<TimeLine> {
    const [usDate] = date.split('T');
    const from = `${usDate}T01:00:00.000Z`;
    const to = `${usDate}T23:59:00.000Z`;

    return formatTimeLine(await this.checkInRepository.findTimeLine(storeId, id, from, to));
  }

  public async findSettings(id: number, storeId: number): Promise<FindSettings> {
    const seller = await this.repository.findSettings(id, storeId);

    if (!seller) {
      return left(new NotFoundException('Seller is not found'));
    }

    return right({
      canChangePrice: seller.canChangePrice,
      useWallet: seller.useWallet,
      discount: seller.maxDiscount
    });
  }

  public async findInfo(storeId: number) {
    let sellers = await this.repository.findInfo(storeId);

    const allCustomers = await this.repository.findCustomers(storeId);

    sellers = sellers.map(seller => {
      const customers = allCustomers.filter(({ sellerId }) => sellerId === seller.id);

      return {
        ...seller,
        customers
      };
    });

    return this.getRanking(sellers.map(seller => this.getInfo(seller)));
  }

  public async findById(id: number, storeId: number): Promise<FindResponse> {
    const seller = await this.repository.findById(id, storeId);

    if (!seller) {
      return left(new NotFoundException('Seller is not found'));
    }

    return right(seller);
  }
}
