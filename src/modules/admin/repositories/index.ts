import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from '@src/modules/database/models';
import { Repository } from 'typeorm';
import { AdminRepositoryDTO } from './dtos/admin-repository';

@Injectable()
export class AdminRepository implements AdminRepositoryDTO {
  constructor(@InjectRepository(Seller) private readonly repository: Repository<Seller>) {}

  public findById(id: number, storeId: number): Promise<Seller | undefined> {
    return this.repository
      .createQueryBuilder()
      .where('Seller.id = :id', { id })
      .andWhere('Seller.storeId = :storeId', { storeId })
      .andWhere('Seller.isActive = :isActive', { isActive: true })
      .andWhere('Seller.admin = :admin', { admin: true })
      .getOne();
  }
}
