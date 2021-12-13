import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from '@src/modules/database/models';
import { Repository } from 'typeorm';
import { SellerRepositoryDTO } from './dtos/seller-repository';

@Injectable()
export class CustomSellerRepository implements SellerRepositoryDTO {
  constructor(@InjectRepository(Seller) private readonly repository: Repository<Seller>) {}

  public findInfo(storeId: number) {
    return this.repository
      .createQueryBuilder()
      .select(['Seller.id', 'Seller.email', 'Seller.name'])
      .leftJoinAndSelect('Seller.customers', 'customers')
      .leftJoinAndSelect('Seller.sales', 'sales')
      .where('Seller.storeId = :storeId', { storeId })
      .getMany();
  }
}
