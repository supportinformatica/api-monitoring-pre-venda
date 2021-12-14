import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '@src/modules/database/models';
import { getKeyName } from '@src/shared/key-name';
import { Repository } from 'typeorm';
import { SeleRepositoryDTO } from './dtos/sale-repository';
import { getQueryPeriod } from './helpers/get-query-period';
@Injectable()
export class CustomSaleRepository implements SeleRepositoryDTO {
  constructor(@InjectRepository(Sale) private readonly repository: Repository<Sale>) {}

  public findAllBySellerId(sellerId: number, storeId: number) {
    return this.repository
      .createQueryBuilder()
      .select([
        'Sale.id',
        'Sale.total',
        'Sale.date',
        'Sale.saleType',
        'Sale.saleStatus',
        'customer.id',
        'customer.name'
      ])
      .innerJoin('Sale.customer', 'customer')
      .where('Sale.sellerId = :sellerId', { sellerId })
      .andWhere('Sale.storeId = :storeId', { storeId })
      .orderBy('Sale.date', 'DESC')
      .getMany();
  }

  public findId(id: number, storeId: number) {
    return this.repository
      .createQueryBuilder()
      .select([
        'Sale.total',
        'Sale.discount',
        'Sale.date',
        'Sale.observation',
        'paymentMethod.name',
        'products.quantity',
        'products.grossValue',
        'product.id',
        'product.name',
        'product.image',
        'product.defaultImage',
        'customer.id',
        'customer.name'
      ])
      .innerJoin('Sale.products', 'products')
      .innerJoin('products.product', 'product')
      .innerJoin('Sale.customer', 'customer')
      .innerJoin('Sale.paymentMethod', 'paymentMethod')
      .where('Sale.id = :id', { id })
      .andWhere('Sale.storeId = :storeId', { storeId })
      .getOne();
  }

  public findInfoBySellerId(sellerId: number, storeId: number, from?: string, to?: string) {
    const queryPeriod = getQueryPeriod(from, to);

    const keyName = getKeyName({
      identifiers: { storeId, sellerId },
      layer: 'repository',
      method: 'INFO_BY_SELLER_ID',
      module: 'sale',
      periods: {
        fromTo: queryPeriod
      }
    });

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
