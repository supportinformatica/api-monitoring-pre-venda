import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from '@src/modules/database/models';
import { Repository } from 'typeorm';
import { StoreRepositoryDTO } from './dtos/store-repository';

@Injectable()
export class CustomStoreRepository implements StoreRepositoryDTO {
  constructor(@InjectRepository(Store) private readonly repository: Repository<Store>) {}

  public findById(storeId: number) {
    return this.repository
      .createQueryBuilder()
      .select(['Store.storeId', 'Store.name'])
      .andWhere('Store.storeId = :storeId', { storeId })
      .getOne();
  }
}
