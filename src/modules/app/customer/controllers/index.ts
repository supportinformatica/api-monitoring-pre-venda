import { BadRequestException, Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { StoreId } from '@src/modules/common/guard/token';
import { PerDaySchema, PeriodSchema } from '@src/modules/common/schemas/period';
import { CacheService } from '@src/modules/common/services/cache-service';
import { getKeyName } from '@src/shared/key-name';
import { PurchasesPerDaySchema } from '../../sale/schemas/per-day';
import { SaleInfoByCustomerSchema } from '../../sale/schemas/sale-info';
import { SaleService } from '../../sale/services';
import { CustomerAndInfoSchema } from '../schemas/customer-and-info';
import { CustomerByIdSchema } from '../schemas/customer-by-id';
import { CustomerService } from '../services';

@Controller('customers')
@ApiTags('clientes')
@ApiBearerAuth('admin')
export class CustomerController {
  constructor(
    private readonly service: CustomerService,
    private readonly cache: CacheService,
    private readonly saleService: SaleService
  ) {}

  @Get('')
  @ApiOkResponse({ isArray: true, type: CustomerAndInfoSchema })
  public async findInfo(@StoreId() storeId: number) {
    const keyName = getKeyName({
      identifiers: {
        storeId
      },
      layer: 'controller',
      method: 'CUSTOMER_INFO',
      module: 'customer'
    });

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const infoSellers = (await this.service.findInfo(storeId)).sort((prev, next) =>
      prev.customer.name.localeCompare(next.customer.name)
    );

    this.cache.set(keyName, infoSellers);

    return infoSellers;
  }

  @Get('top-five')
  @ApiOkResponse({ isArray: true, type: CustomerAndInfoSchema })
  public async findTopFive(@StoreId() storeId: number) {
    const keyName = getKeyName({
      identifiers: {
        storeId
      },
      layer: 'controller',
      method: 'CUSTOMER_TOP_FIVE',
      module: 'customer'
    });

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const infoCustomers = (await this.service.findInfo(storeId)).slice(0, 5);

    this.cache.set(keyName, infoCustomers);

    return infoCustomers;
  }

  @Get(':id')
  @ApiOkResponse({ type: CustomerByIdSchema })
  @ApiNotFoundResponse({ description: 'Customer is not found' })
  public async findById(@Param('id', ParseIntPipe) id: number, @StoreId() storeId: number) {
    const customerOrError = await this.service.findById(id, storeId);

    if (customerOrError.isLeft()) throw customerOrError.value;

    return customerOrError.value;
  }

  @Get(':id/purchases-summary')
  @ApiOkResponse({ type: SaleInfoByCustomerSchema })
  public findInfoSales(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PeriodSchema,
    @StoreId() storeId: number
  ) {
    return this.saleService.findInfoByCustomerId(id, storeId, query?.from, query?.to);
  }

  @Get(':id/purchases-summary-per-day')
  @ApiOkResponse({ type: PurchasesPerDaySchema })
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
      method: 'CUSTOMER_INFO_PURCHASES_PER_DAY',
      module: 'customer',
      periods: {
        days
      }
    });

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const purchasesPerDay = await this.saleService.findInfoByCustomerIdPerDay(id, storeId, days);

    this.cache.set(keyName, purchasesPerDay);

    return purchasesPerDay;
  }
}
