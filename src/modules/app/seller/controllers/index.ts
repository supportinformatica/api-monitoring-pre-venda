import { BadRequestException, Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { StoreId } from '@src/modules/common/guard/token';
import { CacheService } from '@src/modules/common/services/cache-service';
import { SellerService } from '../services';
import { SellersAndInfo } from '../schemas/sellers-and-info';
import { Seller } from '../schemas/seller';
import { SaleService } from '../../sale/services';
import { SaleInfo } from '../../sale/schemas/sale-info';
import { PerDaySchema, PeriodSchema } from '../schemas/period';
import { SalePerDaySchema } from '../../sale/schemas/sale-per-day';

@Controller('sellers')
@ApiTags('vendedores')
@ApiBearerAuth('admin')
export class SellerController {
  constructor(
    private readonly service: SellerService,
    private readonly cache: CacheService,
    private readonly saleService: SaleService
  ) {}

  @Get('')
  @ApiOkResponse({ isArray: true, type: SellersAndInfo })
  public async findInfo(@StoreId() storeId: number) {
    const keyName = `pre_venda://@${storeId}:sellers/info`;

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const infoSellers = (await this.service.findInfo(storeId)).sort((prev, next) =>
      prev.seller.name.localeCompare(next.seller.name)
    );

    this.cache.set(keyName, infoSellers).then(res => {
      if (res === 'OK') return console.log('Caching successfully');

      // TODO: export on log

      return console.log('Caching error');
    });

    return infoSellers;
  }

  @Get('top-five')
  @ApiOkResponse({ isArray: true, type: SellersAndInfo })
  public async findTopFive(@StoreId() storeId: number) {
    const keyName = `pre_venda://@${storeId}:sellers/info/top-five`;

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const infoTopFive = (await this.service.findInfo(storeId)).slice(0, 5);

    this.cache.set(keyName, infoTopFive).then(res => {
      if (res === 'OK') return console.log('Caching successfully');

      return console.log('Caching error');
    });

    return infoTopFive;
  }

  @Get(':id')
  @ApiOkResponse({ type: Seller })
  @ApiNotFoundResponse({ description: 'Seller is not found' })
  public async findById(@Param('id', ParseIntPipe) id: number, @StoreId() storeId: number) {
    const sellerOrError = await this.service.findById(id, storeId);

    if (sellerOrError.isLeft()) throw sellerOrError.value;

    return sellerOrError.value;
  }

  @Get(':id/sales-summary')
  @ApiOkResponse({ type: SaleInfo })
  public findInfoSales(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PeriodSchema,
    @StoreId() storeId: number
  ) {
    return this.saleService.findInfoBySellerId(id, storeId, query?.from, query?.to);
  }

  @Get(':id/sales-summary-per-day')
  @ApiOkResponse({ type: SalePerDaySchema })
  @ApiBadRequestResponse({ description: '"Invalid day format" or "Out range day"' })
  public async findInfoSalesPerDay(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PerDaySchema,
    @StoreId() storeId: number
  ) {
    const days = parseInt(query.days);

    if (Number.isNaN(days)) throw new BadRequestException('Invalid day format');

    if (days < 1 || days > 90) throw new BadRequestException('Out range day');

    const keyName = `pre_venda://@days:${days}@${storeId}:${id}:sellers/info/sales/per-day`;

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const salesPerDay = await this.saleService.findInfoBySellerIdPerDay(id, storeId, days);

    this.cache.set(keyName, salesPerDay).then(res => {
      if (res === 'OK') return console.log('Caching successfully');

      return console.log('Caching error');
    });

    return salesPerDay;
  }
}
