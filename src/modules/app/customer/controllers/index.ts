import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StoreId } from '@src/modules/common/guard/token';
import { CacheService } from '@src/modules/common/services/cache-service';
import { getKeyName } from '@src/shared/key-name';
import { CustomerAndInfoSchema } from '../schemas/customer-and-info';
import { CustomerByIdSchema } from '../schemas/customer-by-id';
import { CustomerService } from '../services';

@Controller('customers')
@ApiTags('clientes')
@ApiBearerAuth('admin')
export class CustomerController {
  constructor(private readonly service: CustomerService, private readonly cache: CacheService) {}

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
}
