import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '@src/modules/database/models';
import { CustomerModule } from '../customer';
import { SaleModule } from '../sale';
import { SellerModule } from '../seller';
import { StoreController } from './controllers';
import { CustomStoreRepository } from './repositories';
import { StoreService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Store]), SellerModule, CustomerModule, SaleModule],
  exports: [StoreService],
  controllers: [StoreController],
  providers: [CustomStoreRepository, StoreService]
})
export class StoreModule {}
