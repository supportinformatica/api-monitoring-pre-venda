import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StoreId } from '@src/modules/common/guard/token';
import { SaleService } from '../services';

@Controller('sales')
@ApiTags('vendas')
@ApiBearerAuth('admin')
export class SaleController {
  constructor(private readonly service: SaleService) {}

  @Get('by-seller/:sellerId')
  public async findAllBySellerId(
    @Param('sellerId', ParseIntPipe) sellerId: number,
    @StoreId() storeId: number
  ) {
    return this.service.findAllBySellerId(sellerId, storeId);
  }
}
