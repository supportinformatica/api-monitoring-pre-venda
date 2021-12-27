import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StoreId } from '@src/modules/common/guard/token';
import { getTypePeriod } from '@src/modules/common/helpers';
import { PerDaySchema, PeriodSchema } from '@src/modules/common/schemas/period';
import { PeriodOptionsSchema } from '@src/modules/common/schemas/period-options-schema';
import { CacheService } from '@src/modules/common/services/cache-service';
import { getKeyName } from '@src/shared/key-name';
import { SaleGraphicByStoreSchema } from '../../graphic/schemas/sale-graphic-by-store';
import { GraphicService } from '../../graphic/services';
import { LastFiveSalesSchema } from '../../sale/schemas/last-five-sales';
import { SalePerDaySchema } from '../../sale/schemas/per-day';
import { SaleInfoByStoreOrSellerSchema } from '../../sale/schemas/sale-info';
import { SaleService } from '../../sale/services';
import { StoreAndInfoSchema } from '../schemas/store-and-info';
import { StoreService } from '../services';

@Controller('store')
@ApiTags('loja')
@ApiBearerAuth('admin')
export class StoreController {
  constructor(
    private readonly service: StoreService,
    private readonly cache: CacheService,
    private readonly saleService: SaleService,
    private readonly graphicService: GraphicService
  ) {}

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

  @Get('sales-summary-per-period')
  @ApiOkResponse({ type: SaleInfoByStoreOrSellerSchema })
  public findInfoSalesPerPeriod(@Query() query: PeriodSchema, @StoreId() storeId: number) {
    return this.saleService.findInfoByStoreId(storeId, query?.from, query?.to);
  }

  @Get('sales-summary-per-day')
  @ApiOkResponse({ type: SalePerDaySchema })
  @ApiBadRequestResponse({ description: '"Invalid day format" or "Out range day"' })
  public async findInfoSalesPerDay(@Query() query: PerDaySchema, @StoreId() storeId: number) {
    const days = parseInt(query.days);

    if (Number.isNaN(days)) throw new BadRequestException('Invalid day format');

    if (days < 1 || days > 90) throw new BadRequestException('Out range day');

    const keyName = getKeyName({
      identifiers: {
        storeId
      },
      layer: 'controller',
      method: 'STORE_INFO_SALES_PER_DAY',
      module: 'store',
      periods: {
        days
      }
    });

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const salesPerDay = await this.saleService.findInfoByStoreIdPerDay(storeId, days);

    this.cache.set(keyName, salesPerDay);

    return salesPerDay;
  }

  @Get('sales-graphic')
  @ApiOkResponse({ type: SaleGraphicByStoreSchema })
  public async findSaleGraphic(@Query() query: PeriodOptionsSchema, @StoreId() storeId: number) {
    const quantity = parseInt(query.quantity);

    if (Number.isNaN(quantity)) throw new BadRequestException('Invalid quantity format');

    const type = getTypePeriod(query.type);

    const keyName = getKeyName({
      identifiers: { storeId },
      layer: 'controller',
      method: 'SELLER_SALE_GRAPHIC',
      module: 'seller',
      periods: {
        type,
        quantity
      }
    });

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const saleGraphic = await this.graphicService.saleByStore(storeId, { quantity, type });

    this.cache.set(keyName, saleGraphic);

    return saleGraphic;
  }
}
