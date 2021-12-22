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
import { SaleInfoByCustomerSchema } from '../../sale/schemas/sale-info';
import { PerDaySchema, PeriodSchema } from '../../../common/schemas/period';
import { SalePerDaySchema } from '../../sale/schemas/sale-per-day';
import { getKeyName } from '@src/shared/key-name';
import { GraphicService } from '../../graphic/services';
import { PeriodOptionsSchema } from '../../graphic/schemas/period-options-schema';
import { getTypePeriod } from './helpers/get-type-period';
import { SaleGraphicBySellerSchema } from '../../graphic/schemas/sale-graphic-by-seller';

@Controller('sellers')
@ApiTags('vendedores')
@ApiBearerAuth('admin')
export class SellerController {
  constructor(
    private readonly service: SellerService,
    private readonly cache: CacheService,
    private readonly saleService: SaleService,
    private readonly graphicService: GraphicService
  ) {}

  @Get('')
  @ApiOkResponse({ isArray: true, type: SellersAndInfo })
  public async findInfo(@StoreId() storeId: number) {
    const keyName = getKeyName({
      identifiers: {
        storeId
      },
      layer: 'controller',
      method: 'SELLER_INFO',
      module: 'seller'
    });

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const infoSellers = (await this.service.findInfo(storeId)).sort((prev, next) =>
      prev.seller.name.localeCompare(next.seller.name)
    );

    this.cache.set(keyName, infoSellers);

    return infoSellers;
  }

  @Get('top-five')
  @ApiOkResponse({ isArray: true, type: SellersAndInfo })
  public async findTopFive(@StoreId() storeId: number) {
    const keyName = getKeyName({
      identifiers: {
        storeId
      },
      layer: 'controller',
      method: 'SELLER_TOP_FIVE',
      module: 'seller'
    });

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const infoTopFive = (await this.service.findInfo(storeId)).slice(0, 5);

    this.cache.set(keyName, infoTopFive);

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
  @ApiOkResponse({ type: SaleInfoByCustomerSchema })
  public findInfoPurchases(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PeriodSchema,
    @StoreId() storeId: number
  ) {
    return this.saleService.findInfoBySellerId(id, storeId, query?.from, query?.to);
  }

  @Get(':id/sales-graphic')
  @ApiOkResponse({ type: SaleGraphicBySellerSchema })
  public async findSaleGraphic(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PeriodOptionsSchema,
    @StoreId() storeId: number
  ) {
    const quantity = parseInt(query.quantity);

    if (Number.isNaN(quantity)) throw new BadRequestException('Invalid quantity format');

    const type = getTypePeriod(query.type);

    const keyName = getKeyName({
      identifiers: { storeId, sellerId: id },
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

    const saleGraphic = await this.graphicService.saleBySeller(id, storeId, { quantity, type });

    this.cache.set(keyName, saleGraphic);

    return saleGraphic;
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

    const keyName = getKeyName({
      identifiers: {
        storeId,
        sellerId: id
      },
      layer: 'controller',
      method: 'SELLER_INFO_SALES_PER_DAY',
      module: 'seller',
      periods: {
        days
      }
    });

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const salesPerDay = await this.saleService.findInfoBySellerIdPerDay(id, storeId, days);

    this.cache.set(keyName, salesPerDay);

    return salesPerDay;
  }
}
