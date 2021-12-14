import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StoreId } from '@src/modules/common/guard/token';
import { CacheService } from '@src/modules/common/services/cache-service';
import { getKeyName } from '@src/shared/key-name';
import { SaleByIdSchema } from '../schemas/sale-by-id';
import { SaleBySellerSchema } from '../schemas/sale-by-seller';
import { SaleService } from '../services';

@Controller('sales')
@ApiTags('vendas')
@ApiBearerAuth('admin')
export class SaleController {
  constructor(private readonly service: SaleService, private readonly cache: CacheService) {}

  @Get(':id')
  @ApiOkResponse({ type: SaleByIdSchema })
  @ApiNotFoundResponse({ description: 'Sale is not found' })
  public async findById(@Param('id', ParseIntPipe) id: number, @StoreId() storeId: number) {
    const saleOrError = await this.service.findById(id, storeId);

    if (saleOrError.isLeft()) throw saleOrError.value;

    return saleOrError.value;
  }

  @Get('by-seller/:sellerId')
  @ApiOkResponse({ isArray: true, type: SaleBySellerSchema })
  public async findAllBySellerId(
    @Param('sellerId', ParseIntPipe) sellerId: number,
    @StoreId() storeId: number
  ) {
    const keyName = getKeyName({
      identifiers: { storeId, sellerId },
      layer: 'controller',
      method: 'SALE_ALL_BY_SELLER',
      module: 'sale'
    });

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const sales = await this.service.findAllBySellerId(sellerId, storeId);

    this.cache.set(keyName, sales);

    return sales;
  }
}
