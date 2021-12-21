import { Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/shared/either';
import { CustomStoreRepository } from '../repositories';
import { FindResponse, StoreServiceDTO } from './dtos/store-services';

@Injectable()
export class StoreService implements StoreServiceDTO {
  constructor(private readonly repository: CustomStoreRepository) {}

  public async findById(storeId: number): Promise<FindResponse> {
    const store = await this.repository.findById(storeId);

    if (!store) return left(new NotFoundException('Store is not found'));

    return right(store);
  }
}
