import { ApiProperty } from '@nestjs/swagger';
import { SaleById, SaleByIdPayment, SaleByIdProducts } from '../interfaces/sale-by-id';
import { SaleCustomerSchema } from './sale-by-seller';

class ProductSchema {
  @ApiProperty({ type: 'number' })
  public readonly id!: number;

  @ApiProperty({ type: 'string' })
  public readonly image!: string;

  @ApiProperty({ type: 'string' })
  public readonly defaultImage!: string;

  @ApiProperty({ type: 'string' })
  public readonly name!: string;
}

class SaleByIdProductsSchema implements SaleByIdProducts {
  @ApiProperty({ type: 'number' })
  public readonly quantity!: number;

  @ApiProperty({ type: 'number' })
  public readonly grossValue!: number;

  @ApiProperty({ type: ProductSchema })
  public readonly product!: ProductSchema;
}

class SaleByIdPaymentSchema implements SaleByIdPayment {
  @ApiProperty({ type: 'string' })
  public readonly name!: string;
}

export class SaleByIdSchema implements SaleById {
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
  public readonly customer!: SaleCustomerSchema;
}
