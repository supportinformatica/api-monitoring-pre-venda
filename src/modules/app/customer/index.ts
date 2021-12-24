import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@src/modules/common';
import { Customer } from '@src/modules/database/models';
import { GraphicModule } from '../graphic';
import { SaleModule } from '../sale';
import { CustomerController } from './controllers';
import { CustomCustomerRepository } from './repositories';
import { CustomerService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), CommonModule, SaleModule, GraphicModule],
  exports: [CustomerService, CustomCustomerRepository],
  providers: [CustomCustomerRepository, CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule {}
