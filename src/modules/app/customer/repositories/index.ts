import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '@src/modules/database/models';
import { Repository } from 'typeorm';
import { CustomerRepositoryDTO } from './dtos/customer-repository';

@Injectable()
export class CustomCustomerRepository implements CustomerRepositoryDTO {
  constructor(@InjectRepository(Customer) private readonly repository: Repository<Customer>) {}

  public findInfo(storeId: number) {
    return (
      this.repository
        .createQueryBuilder()
        .select(['Customer.id', 'Customer.name', 'sales.total'])
        // .leftJoin('Customer.sales', 'sales', 'sales.concluded = :concluded', { concluded: true })
        .leftJoin('Customer.sales', 'sales')
        .where('Customer.storeId = :storeId', { storeId })
        .getMany()
    );
  }

  public findById(id: number, storeId: number) {
    return this.repository
      .createQueryBuilder()
      .select([
        'Customer.name',
        'Customer.email',
        'Customer.phone',
        'Customer.document',
        'Customer.documentType',
        'Customer.observation',
        'Customer.state',
        'Customer.city',
        'Customer.district',
        'Customer.street',
        'Customer.number',
        'Customer.zipCode',
        'Customer.complement',
        'Customer.isWholesale',
        'Customer.hasRestriction'
      ])
      .where('Customer.id = :id', { id })
      .andWhere('Customer.storeId = :storeId', { storeId })
      .getOne();
  }
}
