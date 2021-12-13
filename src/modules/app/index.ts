import { Module } from '@nestjs/common';
import { SellerModule } from './seller';

@Module({
  imports: [SellerModule]
})
export class AppModule {}
