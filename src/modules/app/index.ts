import { Module } from '@nestjs/common';
import { CustomerModule } from './customer';
import { SaleModule } from './sale';
import { SellerModule } from './seller';
import { StoreModule } from './store';

@Module({
  imports: [SellerModule, SaleModule, CustomerModule, StoreModule]
})
export class AppModule {}
