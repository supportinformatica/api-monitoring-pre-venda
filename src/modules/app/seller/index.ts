import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@src/modules/common';
import { Seller, SellerCustomer } from '@src/modules/database/models';
import { CheckInModule } from '../check-in';
import { GraphicModule } from '../graphic';
import { SaleModule } from '../sale';
import { SellerController } from './controllers';
import { CustomSellerRepository } from './repositories';
import { SellerService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seller, SellerCustomer]),
    CommonModule,
    SaleModule,
    GraphicModule,
    CheckInModule
  ],
  exports: [CustomSellerRepository],
  providers: [CustomSellerRepository, SellerService],
  controllers: [SellerController]
})
export class SellerModule {}
