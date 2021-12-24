import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@src/modules/common';
import { Seller } from '@src/modules/database/models';
import { GraphicModule } from '../graphic';
import { SaleModule } from '../sale';
import { SellerController } from './controllers';
import { CustomSellerRepository } from './repositories';
import { SellerService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Seller]), CommonModule, SaleModule, GraphicModule],
  exports: [CustomSellerRepository],
  providers: [CustomSellerRepository, SellerService],
  controllers: [SellerController]
})
export class SellerModule {}
