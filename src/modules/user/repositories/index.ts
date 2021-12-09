import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from '@src/modules/database/models';
import { Repository } from 'typeorm';
import { UserRepositoryDTO } from './dtos/user-repository';

@Injectable()
export class UserRepository implements UserRepositoryDTO {
  constructor(@InjectRepository(Seller) private readonly repository: Repository<Seller>) {}

  public findById(id: number, storeId: number): Promise<Seller | undefined> {
    return this.repository.findOne({ where: { id, storeId, isActive: true } });
  }
}
