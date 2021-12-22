import { ApiProperty } from '@nestjs/swagger';
import { CustomerAndInfo } from '../interfaces/customer-and-info';

class CustomerForInfoSchema {
  @ApiProperty({ type: 'number' })
  public readonly id!: number;

  @ApiProperty({ type: 'string' })
  public readonly name!: string;
}

export class CustomerAndInfoSchema implements CustomerAndInfo {
  @ApiProperty({ type: CustomerForInfoSchema })
  public readonly customer!: CustomerForInfoSchema;

  @ApiProperty({ type: 'number' })
  public readonly ranking!: number;

  @ApiProperty({ type: 'number' })
  public readonly totalSales!: number;

  @ApiProperty({ type: 'number' })
  public readonly totalValue!: number;

  @ApiProperty({ type: 'number' })
  public readonly maxValue!: number;
}
