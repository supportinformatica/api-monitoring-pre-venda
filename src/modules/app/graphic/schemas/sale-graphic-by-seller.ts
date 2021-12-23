import { ApiProperty } from '@nestjs/swagger';
import {
  SaleGraphicBySeller,
  SaleData,
  DataTopCustomers,
  TopFiveCustomers,
  Sale
} from '../interfaces/sale-graphic-by-seller';

class SaleSchema implements Sale {
  @ApiProperty({ type: 'number' })
  public readonly productsQuantity!: number;

  @ApiProperty({ type: 'number' })
  public readonly value!: number;

  @ApiProperty({ type: 'number' })
  public readonly customerId!: number;
}

class SaleDataSchema implements SaleData {
  @ApiProperty({ isArray: true, type: SaleSchema })
  public readonly sales!: SaleSchema[];

  @ApiProperty({ type: 'string' })
  public readonly date!: string;

  @ApiProperty({ type: 'number' })
  public readonly quantity!: number;

  @ApiProperty({ type: 'number' })
  public readonly total!: number;

  @ApiProperty({ type: 'boolean' })
  public readonly decreasing!: boolean;

  @ApiProperty({ type: 'boolean' })
  public readonly isDefault!: boolean;
}

class DataCustomerSchema {
  @ApiProperty({ type: 'string' })
  public readonly date!: string;

  @ApiProperty({ type: 'number' })
  public readonly quantity!: number;
}

class DataTopCustomersSchema implements DataTopCustomers {
  @ApiProperty({ isArray: true, type: DataCustomerSchema })
  public readonly data!: DataCustomerSchema[];

  @ApiProperty({ type: 'number' })
  public readonly id!: number;

  @ApiProperty({ type: 'number' })
  public readonly ranking!: number;
}

class TopFiveCustomersSchema implements TopFiveCustomers {
  @ApiProperty({ type: 'number' })
  public readonly id!: number;

  @ApiProperty({ type: 'number' })
  public readonly name!: string;

  @ApiProperty({ type: 'number' })
  public readonly quantitySales!: number;

  @ApiProperty({ type: 'number' })
  public readonly ranking!: number;
}

export class SaleGraphicBySellerSchema implements SaleGraphicBySeller {
  @ApiProperty({ isArray: true, type: SaleDataSchema })
  public readonly data!: SaleDataSchema[];

  @ApiProperty({ isArray: true, type: DataTopCustomersSchema })
  public readonly dataTopCustomers!: DataTopCustomersSchema[];

  @ApiProperty({ type: 'number' })
  public readonly totalSales!: number;

  @ApiProperty({ type: 'number' })
  public readonly mediaSales!: number;

  @ApiProperty({ type: 'number' })
  public readonly totalValue!: number;

  @ApiProperty({ type: 'number' })
  public readonly mediaValue!: number;

  @ApiProperty({ type: 'number' })
  public readonly maxValue!: number;

  @ApiProperty({ type: 'number' })
  public readonly maxQuantity!: number;

  @ApiProperty({ isArray: true, type: TopFiveCustomersSchema })
  public readonly topFiveCustomers!: TopFiveCustomersSchema[];
}
