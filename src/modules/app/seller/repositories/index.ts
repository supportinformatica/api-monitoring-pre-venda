import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller, SellerCustomer } from '@src/modules/database/models';
import { getKeyName } from '@src/shared/key-name';
import { Repository, UpdateResult } from 'typeorm';
import { Settings } from '../interfaces/settings';
import { SellerRepositoryDTO } from './dtos/seller-repository';

@Injectable()
export class CustomSellerRepository implements SellerRepositoryDTO {
  constructor(
    @InjectRepository(Seller) private readonly repository: Repository<Seller>,
    @InjectRepository(SellerCustomer)
    private readonly customers: Repository<SellerCustomer>
  ) {}

  public changeMaxDiscount(id: number, storeId: number, discount: number): Promise<UpdateResult> {
    return this.repository.update({ id, storeId }, { maxDiscount: discount });
  }

  public toggleSettings(id: number, storeId: number, settings: Settings): Promise<UpdateResult> {
    return this.repository.update({ id, storeId }, settings);
  }

  public findCustomers(storeId: number) {
    return this.customers
      .createQueryBuilder()
      .where('SellerCustomer.storeId = :storeId', { storeId })
      .getMany();
  }

  public findInfo(storeId: number) {
    return this.repository
      .createQueryBuilder()
      .select(['Seller.id', 'Seller.email', 'Seller.name', 'sales.total'])
      .leftJoin('Seller.sales', 'sales', 'sales.storeId = :storeId and sales.deleted = :deleted', {
        storeId,
        deleted: false
      })
      .where('Seller.storeId = :storeId', { storeId })
      .getMany();
  }

  public findById(id: number, storeId: number) {
    return this.repository
      .createQueryBuilder()
      .select(['Seller.id', 'Seller.email', 'Seller.name'])
      .where('Seller.id = :id', { id })
      .andWhere('Seller.storeId = :storeId', { storeId })
      .getOne();
  }

  public findSettings(id: number, storeId: number) {
    return this.repository
      .createQueryBuilder()
      .select(['Seller.canChangePrice', 'Seller.useWallet', 'Seller.maxDiscount'])
      .where('Seller.id = :id', { id })
      .andWhere('Seller.storeId = :storeId', { storeId })
      .getOne();
  }

  public findAllForStore(storeId: number) {
    const keyName = getKeyName({
      identifiers: { storeId },
      layer: 'repository',
      method: 'ALL_FOR_STORE',
      module: 'seller'
    });

    return this.repository
      .createQueryBuilder()
      .select(['Seller.id'])
      .where('Seller.storeId = :storeId', { storeId })
      .cache(keyName)
      .getMany();
  }
}
