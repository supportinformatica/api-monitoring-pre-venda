import { Module } from '@nestjs/common';
import { SaleModule } from '../sale';
import { GraphicService } from './services';

@Module({
  imports: [SaleModule],
  exports: [GraphicService],
  providers: [GraphicService]
})
export class GraphicModule {}
