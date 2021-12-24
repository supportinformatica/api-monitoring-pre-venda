import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StoreId } from '@src/modules/common/guard/token';
import { StoreAndInfoSchema } from '../schemas/store-and-info';
import { StoreService } from '../services';

@Controller('store')
@ApiTags('loja')
@ApiBearerAuth('admin')
export class StoreController {
  constructor(private readonly service: StoreService) {}

  @Get('summary')
  @ApiOkResponse({ type: StoreAndInfoSchema })
  public async findById(@StoreId() storeId: number) {
    return this.service.findInfo(storeId);
  }
}
