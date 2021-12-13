import { Injectable } from '@nestjs/common';
import { ISale, ISeller } from '@src/modules/database/interfaces';
import { ISellerAndInfo } from '../interfaces/seller-and-info';
import { CustomSellerRepository } from '../repositories';
import { SellerServiceDTO } from './dtos/seller-service';

@Injectable()
export class SellerService implements SellerServiceDTO {
  constructor(private readonly repository: CustomSellerRepository) {}

  private getTotalValue(sales: ISale[]): number {
    if (!sales.length) return 0;

    return sales.map(sale => sale.total).reduce((prev, curr) => prev + curr);
  }

  private getRanking(sellers: ISellerAndInfo[]): ISellerAndInfo[] {
    return sellers
      .sort((prev, next) => next.totalValue - prev.totalValue)
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
  public async findInfo(storeId: number) {
    return this.getRanking(
      (await this.repository.findInfo(storeId)).map(seller => this.getInfo(seller))
    );
  }
}
