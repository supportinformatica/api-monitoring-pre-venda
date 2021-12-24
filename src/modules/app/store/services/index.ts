import { Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/shared/either';
import { CustomCustomerRepository } from '../../customer/repositories';
import { CustomSaleRepository } from '../../sale/repositories';
import { CustomSellerRepository } from '../../seller/repositories';
import { CustomStoreRepository } from '../repositories';
import { FindResponse, StoreServiceDTO } from './dtos/store-services';
import { formatInfo } from './helpers/format-info';

@Injectable()
export class StoreService implements StoreServiceDTO {
  constructor(
    private readonly repository: CustomStoreRepository,
    private readonly sellerRepository: CustomSellerRepository,
    private readonly customerRepository: CustomCustomerRepository,
    private readonly saleRepository: CustomSaleRepository
  ) {}

  public async findById(storeId: number): Promise<FindResponse> {
    const store = await this.repository.findById(storeId);

    if (!store) return left(new NotFoundException('Store is not found'));

    return right(store);
  }

  public async findInfo(storeId: number) {
    const store = await this.repository.findById(storeId);

    if (!store) throw new NotFoundException('Store is not found');

    const [sellers, customers, sales] = await Promise.all([
      this.sellerRepository.findAllForStore(storeId),
      this.customerRepository.findAllForStore(storeId),
      this.saleRepository.findAllForStore(storeId)
    ]);

    return formatInfo(store, sellers, customers, sales);
  }
}
