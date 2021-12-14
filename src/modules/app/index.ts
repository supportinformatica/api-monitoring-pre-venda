import { Module } from '@nestjs/common';
import { SaleModule } from './sale';
import { SellerModule } from './seller';

@Module({
  imports: [SellerModule, SaleModule]
})
export class AppModule {}
