import { ApiProperty } from '@nestjs/swagger';

import {
  SaleByCustomer,
  PurchaseStatusSchema,
  PurchaseTypeSchema
} from '../interfaces/sales-by-customer-per-period';

export class PurchaseByCustomerPerPeriod implements SaleByCustomer {
  @ApiProperty({ type: 'number' })
  public readonly id!: number;

  @ApiProperty({ type: 'string' })
  public readonly date!: string;

  @ApiProperty({ type: 'number' })
  public readonly total!: number;

  @ApiProperty({ type: 'string', enum: ['PRE_SALE', 'BUDGET'] })
  public readonly purchaseType!: PurchaseTypeSchema;

  @ApiProperty({ type: 'string', enum: ['SYNCHRONIZED', 'APPROVED', 'REJECTED'] })
  public readonly purchaseStatus!: PurchaseStatusSchema;
}
