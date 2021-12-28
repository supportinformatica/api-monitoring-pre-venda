import { ApiProperty } from '@nestjs/swagger';
import { PurchaseById } from '../interfaces/purchase-by-id';
import { SaleByIdPaymentSchema, SaleByIdProductsSchema } from './sale-by-id';
import { SaleCustomerSchema } from './sale-by-seller';

export class PurchaseByIdSchema implements PurchaseById {
  @ApiProperty({ type: 'string' })
  public readonly date!: string;

  @ApiProperty({ type: 'number' })
  public readonly total!: number;

  @ApiProperty({ type: 'number' })
  public readonly discount!: number;

  @ApiProperty({ type: 'string' })
  public readonly observation!: string;

  @ApiProperty({ isArray: true, type: SaleByIdProductsSchema })
  public readonly products!: SaleByIdProductsSchema[];

  @ApiProperty({ type: SaleByIdPaymentSchema })
  public readonly paymentMethod!: SaleByIdPaymentSchema;

  @ApiProperty({ type: SaleCustomerSchema })
  public readonly seller!: SaleCustomerSchema;
}
