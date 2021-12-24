import { ApiProperty } from '@nestjs/swagger';
import { StoreAndInfo } from '../interfaces/store-and-info';

class StoreSchema {
  @ApiProperty({ type: 'string' })
  public readonly name!: string;
}

export class StoreAndInfoSchema implements StoreAndInfo {
  @ApiProperty({ type: StoreSchema })
  public readonly store!: StoreSchema;

  @ApiProperty({ type: 'number' })
  public readonly totalSellers!: number;

  @ApiProperty({ type: 'number' })
  public readonly totalCustomers!: number;

  @ApiProperty({ type: 'number' })
  public readonly totalSales!: number;

  @ApiProperty({ type: 'number' })
  public readonly totalValue!: number;

  @ApiProperty({ type: 'number' })
  public readonly maxValue!: number;
}
