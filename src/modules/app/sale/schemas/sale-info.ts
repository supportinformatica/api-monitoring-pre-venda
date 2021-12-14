import { ApiProperty } from '@nestjs/swagger';
import { SaleAndInfo } from '../interfaces/sale-and-info';

export class SaleInfo implements SaleAndInfo {
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
