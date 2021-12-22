import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@src/modules/common';
import { Customer } from '@src/modules/database/models';
import { SaleModule } from '../sale';
import { CustomerController } from './controllers';
import { CustomCustomerRepository } from './repositories';
import { CustomerService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), CommonModule, SaleModule],
  exports: [CustomerService],
  providers: [CustomCustomerRepository, CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule {}
