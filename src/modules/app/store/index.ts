import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@src/modules/common';
import { Store } from '@src/modules/database/models';
import { CustomerModule } from '../customer';
import { GraphicModule } from '../graphic';
import { SaleModule } from '../sale';
import { SellerModule } from '../seller';
import { StoreController } from './controllers';
import { CustomStoreRepository } from './repositories';
import { StoreService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store]),
    CommonModule,
    SellerModule,
    CustomerModule,
    SaleModule,
    GraphicModule
  ],
  exports: [CustomStoreRepository, StoreService],
  controllers: [StoreController],
  providers: [CustomStoreRepository, StoreService]
})
export class StoreModule {}
