import { ApiProperty } from '@nestjs/swagger';
import { SaleAndInfoBySeller, SaleAndInfoByCustomer } from '../interfaces/sale-and-info';

export class SaleInfoBySellerSchema implements SaleAndInfoBySeller {
  @ApiProperty({ type: 'string' })
  public readonly beginningPeriod!: string;

  @ApiProperty({ type: 'string' })
  public readonly endPeriod!: string;

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
}

export class SaleInfoByCustomerSchema implements SaleAndInfoByCustomer {
  @ApiProperty({ type: 'string' })
  public readonly beginningPeriod!: string;

  @ApiProperty({ type: 'string' })
  public readonly endPeriod!: string;

  @ApiProperty({ type: 'number' })
  public readonly totalPurchases!: number;

  @ApiProperty({ type: 'number' })
  public readonly mediaPurchases!: number;

  @ApiProperty({ type: 'number' })
  public readonly totalValue!: number;

  @ApiProperty({ type: 'number' })
  public readonly mediaValue!: number;

  @ApiProperty({ type: 'number' })
  public readonly maxValue!: number;
}
