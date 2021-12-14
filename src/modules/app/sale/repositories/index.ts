import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '@src/modules/database/models';
import { Repository } from 'typeorm';
import { SeleRepositoryDTO, QueryPeriod } from './dtos/sale-repository';
@Injectable()
export class CustomSaleRepository implements SeleRepositoryDTO {
  constructor(@InjectRepository(Sale) private readonly repository: Repository<Sale>) {}

  private getQueryPeriod(setFrom?: string, setTo?: string): QueryPeriod {
    const query = 'Sale.date BETWEEN :from AND :to';

    let from = new Date('2021-06-01').toISOString();
    let to = new Date().toISOString();

    if (setFrom && setTo) {
      (from = setFrom), (to = setTo);
    }

    const params = { from, to };
    return { query, params };
  }

  private getKeyName(sellerId: number, storeId: number, { params }: QueryPeriod) {
    const app = 'pre_venda://';
    const period = `@from:${params.from}@to:${params.to}`;
    const identifier = `@${storeId}:sales`;
    const description = `/info/by-seller:${sellerId}`;

    return `${app}${period}${identifier}${description}`;
  }

  public findInfoBySellerId(sellerId: number, storeId: number, from?: string, to?: string) {
    const queryPeriod = this.getQueryPeriod(from, to);

    const keyName = this.getKeyName(sellerId, storeId, queryPeriod);

    return this.repository
      .createQueryBuilder()
      .select(['Sale.date', 'Sale.total'])
      .where('Sale.sellerId = :sellerId', { sellerId })
      .andWhere('Sale.storeId = :storeId', { storeId })
      .andWhere(queryPeriod.query, queryPeriod.params)
      .orderBy('Sale.date', 'ASC')
      .cache(keyName)
      .getMany();
  }
}
