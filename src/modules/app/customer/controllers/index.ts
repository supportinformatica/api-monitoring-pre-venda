import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StoreId } from '@src/modules/common/guard/token';
import { CustomerByIdSchema } from '../schemas/customer-by-id';
import { CustomerService } from '../services';

@Controller('customers')
@ApiTags('clientes')
@ApiBearerAuth('admin')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Get(':id')
  @ApiOkResponse({ type: CustomerByIdSchema })
  @ApiNotFoundResponse({ description: 'Customer is not found' })
  public async findById(@Param('id', ParseIntPipe) id: number, @StoreId() storeId: number) {
    const customerOrError = await this.service.findById(id, storeId);

    if (customerOrError.isLeft()) throw customerOrError.value;

    return customerOrError.value;
  }
}
