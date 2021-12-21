import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '@src/modules/database/models';
import { CustomStoreRepository } from './repositories';
import { StoreService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  exports: [StoreService],
  providers: [CustomStoreRepository, StoreService]
})
export class StoreModule {}
