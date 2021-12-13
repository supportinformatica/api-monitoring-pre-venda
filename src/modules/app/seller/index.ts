import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@src/modules/common';
import { Seller } from '@src/modules/database/models';
import { SellerController } from './controllers';
import { CustomSellerRepository } from './repositories';
import { SellerService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Seller]), CommonModule],
  providers: [CustomSellerRepository, SellerService],
  controllers: [SellerController]
})
export class SellerModule {}
