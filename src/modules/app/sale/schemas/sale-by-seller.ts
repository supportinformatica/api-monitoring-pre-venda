import { ApiProperty } from '@nestjs/swagger';
import {
  SaleStatusSchema,
  SaleTypeSchema,
  SaleBySeller,
  ICustomerSchema
} from '../interfaces/sale-by-seller';

export class SaleCustomerSchema implements ICustomerSchema {
  @ApiProperty({ type: 'number' })
  public readonly id!: number;

  @ApiProperty({ type: 'string' })
  public readonly name!: string;
}

export class SaleBySellerSchema implements SaleBySeller {
  @ApiProperty({ type: 'number' })
  public readonly id!: number;

  @ApiProperty({ type: 'string' })
  public readonly date!: string;

  @ApiProperty({ type: 'number' })
  public readonly total!: number;

  @ApiProperty({ type: 'string', enum: ['PRE_SALE', 'BUDGET'] })
  public readonly saleType!: SaleTypeSchema;

  @ApiProperty({ type: 'string', enum: ['SYNCHRONIZED', 'APPROVED', 'REJECTED'] })
  public readonly saleStatus!: SaleStatusSchema;

  @ApiProperty({ type: SaleCustomerSchema })
  public readonly customer!: SaleCustomerSchema;
}
