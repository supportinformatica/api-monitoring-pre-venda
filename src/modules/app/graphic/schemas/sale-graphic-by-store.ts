import { ApiProperty } from '@nestjs/swagger';
import { SaleDataByStore, SaleGraphicByStore } from '../interfaces/sale-graphic-by-store';

class SaleDataByStoreSchema implements SaleDataByStore {
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

export class SaleGraphicByStoreSchema implements SaleGraphicByStore {
  @ApiProperty({ isArray: true, type: SaleDataByStoreSchema })
  public readonly data!: SaleDataByStoreSchema[];

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
}
