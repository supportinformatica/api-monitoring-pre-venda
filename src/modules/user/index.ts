import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from '../database/models';
import { UserRepository } from './repositories';
import { UserService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Seller])],
  exports: [UserService],
  providers: [UserRepository, UserService]
})
export class UserModule {}
