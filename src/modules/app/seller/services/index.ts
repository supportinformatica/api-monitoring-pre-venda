import { Injectable, NotFoundException } from '@nestjs/common';
import { ISale, ISeller } from '@src/modules/database/interfaces';
import { left, right } from '@src/shared/either';
import { CustomSaleRepository } from '../../sale/repositories';
import { ISellerAndInfo } from '../interfaces/seller-and-info';
import { TimeLine } from '../interfaces/time-line';
import { CustomSellerRepository } from '../repositories';
import { SellerServiceDTO, FindResponse } from './dtos/seller-service';
import { formatTimeLine } from './helpers/format-time-line';

@Injectable()
export class SellerService implements SellerServiceDTO {
  constructor(
    private readonly repository: CustomSellerRepository,
    private readonly saleRepository: CustomSaleRepository
  ) {}

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

  public async findTimeLine(id: number, storeId: number): Promise<TimeLine> {
    const [usDate] = new Date().toISOString().split('T');

    const from = new Date(`${usDate} 00:00:00`).toISOString();
    const to = new Date().toISOString();

    return formatTimeLine(await this.saleRepository.findTimeLine(storeId, id, from, to));
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
