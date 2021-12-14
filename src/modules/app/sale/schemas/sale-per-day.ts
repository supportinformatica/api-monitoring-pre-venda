import { ApiProperty } from '@nestjs/swagger';

class SalePerDayDataSchema {
  @ApiProperty({ type: 'string' })
  public readonly date!: string;

  @ApiProperty({ type: 'number' })
  public readonly quantity!: number;
}

export class SalePerDaySchema {
  @ApiProperty({ type: 'number' })
  public readonly max!: number;

  @ApiProperty({ isArray: true, type: SalePerDayDataSchema })
  public readonly sales!: SalePerDayDataSchema[];
}
