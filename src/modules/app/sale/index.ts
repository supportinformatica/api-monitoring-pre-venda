import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@src/modules/common';
import { Sale } from '@src/modules/database/models';
import { CustomSaleRepository } from './repositories';
import { SaleService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Sale]), CommonModule],
  exports: [SaleService],
  providers: [CustomSaleRepository, SaleService]
})
export class SaleModule {}
