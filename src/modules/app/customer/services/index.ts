import { Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/shared/either';
import { CustomCustomerRepository } from '../repositories';
import { CustomerServiceDTO, FindResponse } from './dtos/customer-service';

@Injectable()
export class CustomerService implements CustomerServiceDTO {
  constructor(private readonly repository: CustomCustomerRepository) {}

  public async findById(id: number, storeId: number): Promise<FindResponse> {
    const customer = await this.repository.findById(id, storeId);

    if (!customer) return left(new NotFoundException('Customer is not found'));

    return right(customer);
  }
}
