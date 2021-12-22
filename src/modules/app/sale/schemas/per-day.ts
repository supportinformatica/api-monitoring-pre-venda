import { ApiProperty } from '@nestjs/swagger';

class PerDayDataSchema {
  @ApiProperty({ type: 'string' })
  public readonly date!: string;

  @ApiProperty({ type: 'number' })
  public readonly quantity!: number;
}

export class SalePerDaySchema {
  @ApiProperty({ type: 'number' })
  public readonly max!: number;

  @ApiProperty({ isArray: true, type: PerDayDataSchema })
  public readonly sales!: PerDayDataSchema[];
}

export class PurchasesPerDaySchema {
  @ApiProperty({ type: 'number' })
  public readonly max!: number;

  @ApiProperty({ isArray: true, type: PerDayDataSchema })
  public readonly purchases!: PerDayDataSchema[];
}
