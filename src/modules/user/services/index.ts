import { Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/shared/either';
import { UserRepository } from '../repositories';
import { FindResponse, UserServiceDTO } from './dtos/user-service';

@Injectable()
export class UserService implements UserServiceDTO {
  constructor(private readonly repository: UserRepository) {}

  public async findById(id: number, storeId: number): Promise<FindResponse> {
    const user = await this.repository.findById(id, storeId);

    if (!user) return left(new NotFoundException('User is not found'));

    return right(user);
  }
}
