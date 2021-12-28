import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '@src/modules/database/models';
import { getKeyName } from '@src/shared/key-name';
import { Repository } from 'typeorm';
import { FindForGraphicResponse, SeleRepositoryDTO } from './dtos/sale-repository';
import { getQueryPeriod } from './helpers/get-query-period';

@Injectable()
export class CustomSaleRepository implements SeleRepositoryDTO {
  constructor(@InjectRepository(Sale) private readonly repository: Repository<Sale>) {}

  public findLastFiveSalesByStoreId(storeId: number) {
    const keyName = getKeyName({
      identifiers: { storeId },
      layer: 'repository',
      method: 'LAST_FIVE_SALES_BY_STORE_ID',
      module: 'sale'
    });

    return this.repository
      .createQueryBuilder()
      .select(['Sale.id', 'Sale.total', 'customer.id', 'customer.name'])
      .innerJoin('Sale.customer', 'customer')
      .where('Sale.storeId = :storeId', { storeId })
      .orderBy('Sale.date', 'DESC')
      .cache(keyName)
      .getMany();
  }

  public findNullSales() {
    return this.repository
      .createQueryBuilder()
      .select(['Sale.id', 'Sale.storeId', 'Sale.dateSync'])
      .where('Sale.budgetId IS NULL')
      .andWhere('Sale.storeId <> :storeId', { storeId: 27 })
      .getMany();
  }

  public findAllForStore(storeId: number) {
    const keyName = getKeyName({
      identifiers: { storeId },
      layer: 'repository',
      method: 'ALL_FOR_STORE',
      module: 'sale'
    });

    return this.repository
      .createQueryBuilder()
      .select(['Sale.total'])
      .where('Sale.storeId = :storeId', { storeId })
      .cache(keyName)
      .getMany();
  }

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

  public findByCustomerPerPeriod(customerId: number, storeId: number, from?: string, to?: string) {
    const queryPeriod = getQueryPeriod(from, to);

    const keyName = getKeyName({
      identifiers: { storeId },
      layer: 'repository',
      method: 'PURCHASE_BY_CUSTOMER_PER_PERIOD',
      module: 'sale',
      periods: {
        fromTo: queryPeriod
      }
    });

    return this.repository
      .createQueryBuilder()
      .select(['Sale.id', 'Sale.total', 'Sale.date', 'Sale.saleType', 'Sale.saleStatus'])
      .where('Sale.customerId = :customerId', { customerId })
      .andWhere('Sale.storeId = :storeId', { storeId })
      .andWhere(queryPeriod.query, queryPeriod.params)
      .orderBy('Sale.date', 'ASC')
      .cache(keyName)
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

  public findInfoByStoreId(storeId: number, from?: string, to?: string) {
    const queryPeriod = getQueryPeriod(from, to);

    const keyName = getKeyName({
      identifiers: { storeId },
      layer: 'repository',
      method: 'INFO_BY_STORE_ID',
      module: 'sale',
      periods: {
        fromTo: queryPeriod
      }
    });

    return this.repository
      .createQueryBuilder()
      .select(['Sale.date', 'Sale.total'])
      .andWhere('Sale.storeId = :storeId', { storeId })
      .andWhere(queryPeriod.query, queryPeriod.params)
      .orderBy('Sale.date', 'ASC')
      .cache(keyName)
      .getMany();
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

  public findInfoByCustomerId(customerId: number, storeId: number, from?: string, to?: string) {
    const queryPeriod = getQueryPeriod(from, to);

    const keyName = getKeyName({
      identifiers: { storeId, customerId },
      layer: 'repository',
      method: 'INFO_BY_CUSTOMER_ID',
      module: 'sale',
      periods: {
        fromTo: queryPeriod
      }
    });

    return this.repository
      .createQueryBuilder()
      .select(['Sale.date', 'Sale.total'])
      .where('Sale.customerId = :customerId', { customerId })
      .andWhere('Sale.storeId = :storeId', { storeId })
      .andWhere(queryPeriod.query, queryPeriod.params)
      .orderBy('Sale.date', 'ASC')
      .cache(keyName)
      .getMany();
  }

  public async findForGraphicByStoreId(
    storeId: number,
    from: string,
    to: string
  ): Promise<FindForGraphicResponse> {
    const queryPeriod = getQueryPeriod(from, to);

    const results = await this.repository
      .createQueryBuilder()
      .select([
        'Sale.date',
        'Sale.total',
        'Sale.discount',
        'products.id',
        'customer.id',
        'customer.name'
      ])
      .innerJoin('Sale.customer', 'customer')
      .innerJoin('Sale.products', 'products')
      .andWhere('Sale.storeId = :storeId', { storeId })
      .andWhere(queryPeriod.query, queryPeriod.params)
      .orderBy('Sale.date', 'ASC')
      .getMany();

    return { results, period: { from, to } };
  }

  public async findForGraphicBySellerId(
    sellerId: number,
    storeId: number,
    from: string,
    to: string
  ): Promise<FindForGraphicResponse> {
    const queryPeriod = getQueryPeriod(from, to);

    const results = await this.repository
      .createQueryBuilder()
      .select([
        'Sale.date',
        'Sale.total',
        'Sale.discount',
        'products.id',
        'customer.id',
        'customer.name'
      ])
      .innerJoin('Sale.customer', 'customer')
      .innerJoin('Sale.products', 'products')
      .where('Sale.sellerId = :sellerId', { sellerId })
      .andWhere('Sale.storeId = :storeId', { storeId })
      .andWhere(queryPeriod.query, queryPeriod.params)
      .orderBy('Sale.date', 'ASC')
      .getMany();

    return { results, period: { from, to } };
  }

  public async findForGraphicByCustomerId(
    customerId: number,
    storeId: number,
    from: string,
    to: string
  ): Promise<FindForGraphicResponse> {
    const queryPeriod = getQueryPeriod(from, to);

    const results = await this.repository
      .createQueryBuilder()
      .select(['Sale.date', 'Sale.total'])
      .where('Sale.customerId = :customerId', { customerId })
      .andWhere('Sale.storeId = :storeId', { storeId })
      .andWhere(queryPeriod.query, queryPeriod.params)
      .orderBy('Sale.date', 'ASC')
      .getMany();

    return { results, period: { from, to } };
  }
}
