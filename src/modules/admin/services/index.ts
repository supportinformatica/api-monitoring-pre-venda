import { Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/shared/either';
import { AdminRepository } from '../repositories';
import { FindResponse, AdminServiceDTO } from './dtos/admin-service';

@Injectable()
export class AdminService implements AdminServiceDTO {
  constructor(private readonly repository: AdminRepository) {}

  public async findById(id: number, storeId: number): Promise<FindResponse> {
    const user = await this.repository.findById(id, storeId);

    if (!user) return left(new NotFoundException('User is not found'));

    return right(user);
  }
}
