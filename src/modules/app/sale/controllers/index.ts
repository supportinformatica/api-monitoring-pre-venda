import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StoreId } from '@src/modules/common/guard/token';
import { PeriodSchema } from '@src/modules/common/schemas/period';
import { PurchaseByIdSchema } from '../schemas/purchase-by-id';
import { SaleByIdSchema } from '../schemas/sale-by-id';
import { SaleBySellerSchema } from '../schemas/sale-by-seller';
import { PurchaseByCustomerPerPeriod } from '../schemas/sales-by-customer-per-period';
import { SaleService } from '../services';

@Controller('sales')
@ApiTags('vendas')
@ApiBearerAuth('admin')
export class SaleController {
  constructor(private readonly service: SaleService) {}

  @Get(':id')
  @ApiOkResponse({ type: SaleByIdSchema })
  @ApiNotFoundResponse({ description: 'Sale is not found' })
  public async findById(@Param('id', ParseIntPipe) id: number, @StoreId() storeId: number) {
    const saleOrError = await this.service.findById(id, storeId);

    if (saleOrError.isLeft()) throw saleOrError.value;

    return saleOrError.value;
  }

  @Get('purchase-by-id/:id')
  @ApiOkResponse({ type: PurchaseByIdSchema })
  @ApiNotFoundResponse({ description: 'Purchase is not found' })
  public async findPurchaseById(@Param('id', ParseIntPipe) id: number, @StoreId() storeId: number) {
    const saleOrError = await this.service.findPurchaseById(id, storeId);

    if (saleOrError.isLeft()) throw saleOrError.value;

    return saleOrError.value;
  }

  @Get('by-seller/:sellerId')
  @ApiOkResponse({ isArray: true, type: SaleBySellerSchema })
  public async findBySellerPerPeriod(
    @Query() query: PeriodSchema,
    @Param('sellerId', ParseIntPipe) sellerId: number,
    @StoreId() storeId: number
  ) {
    return this.service.findBySellerPerPeriod(sellerId, storeId, query.from, query.to);
  }

  @Get('by-customer-per-period/:customerId')
  @ApiOkResponse({ isArray: true, type: PurchaseByCustomerPerPeriod })
  public async findByCustomerPerPeriod(
    @Query() query: PeriodSchema,
    @Param('customerId', ParseIntPipe) customerId: number,
    @StoreId() storeId: number
  ) {
    return this.service.findByCustomerPerPeriod(customerId, storeId, query.from, query.to);
  }
}
