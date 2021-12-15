import { Module } from '@nestjs/common';
import { CustomerModule } from './customer';
import { SaleModule } from './sale';
import { SellerModule } from './seller';

@Module({
  imports: [SellerModule, SaleModule, CustomerModule]
})
export class AppModule {}
