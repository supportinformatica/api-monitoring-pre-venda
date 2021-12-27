import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StoreId } from '@src/modules/common/guard/token';
import { LastFiveSalesSchema } from '../../sale/schemas/last-five-sales';
import { SaleService } from '../../sale/services';
import { StoreAndInfoSchema } from '../schemas/store-and-info';
import { StoreService } from '../services';

@Controller('store')
@ApiTags('loja')
@ApiBearerAuth('admin')
export class StoreController {
  constructor(private readonly service: StoreService, private readonly saleService: SaleService) {}

  @Get('summary')
  @ApiOkResponse({ type: StoreAndInfoSchema })
  public async findById(@StoreId() storeId: number) {
    return this.service.findInfo(storeId);
  }

  @Get('last-five-sales')
  @ApiOkResponse({ isArray: true, type: LastFiveSalesSchema })
  public async findLastFiveSales(@StoreId() storeId: number) {
    return this.saleService.findLastFiveSalesByStoreId(storeId);
  }
}
