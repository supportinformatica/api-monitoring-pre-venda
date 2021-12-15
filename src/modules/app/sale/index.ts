import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@src/modules/common';
import { Sale } from '@src/modules/database/models';
import { SaleController } from './controllers';
import { CustomSaleRepository } from './repositories';
import { SaleService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Sale]), CommonModule],
  exports: [SaleService, CustomSaleRepository],
  providers: [CustomSaleRepository, SaleService],
  controllers: [SaleController]
})
export class SaleModule {}
