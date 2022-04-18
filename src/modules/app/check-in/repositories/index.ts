import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckIn } from '@src/modules/database/models';
import { Repository } from 'typeorm';

@Injectable()
export class CustomCheckInRepository {
  constructor(@InjectRepository(CheckIn) private readonly repository: Repository<CheckIn>) {}

  public findTimeLine(
    storeId: number,
    sellerId: number,
    from: string,
    to: string
  ): Promise<CheckIn[]> {
    return this.repository
      .createQueryBuilder()
      .select([
        'CheckIn.createdAt',
        'CheckIn.lat',
        'CheckIn.long',
        'customer.id',
        'customer.name',
        'sale.id',
        'sale.total'
      ])
      .innerJoin('CheckIn.customer', 'customer', 'customer.storeId = :storeId', { storeId })
      .leftJoin('CheckIn.sale', 'sale', 'sale.storeId = :storeId', { storeId })
      .where('CheckIn.sellerId = :sellerId', { sellerId })
      .andWhere('CheckIn.storeId = :storeId', { storeId })
      .andWhere('CheckIn.createdAt BETWEEN :from AND :to', { from, to })
      .orderBy('CheckIn.createdAt', 'DESC')
      .getMany();
  }
}
