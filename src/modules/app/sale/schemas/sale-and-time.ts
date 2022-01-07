import { ApiProperty } from '@nestjs/swagger';

class CustomerSchema {
  @ApiProperty({ type: 'string' })
  public readonly name!: string;
}

class SaleSchema {
  @ApiProperty({ type: 'number' })
  public readonly id!: number;

  @ApiProperty({ type: 'string' })
  public readonly dateSync!: Date;

  @ApiProperty({ type: 'number' })
  public readonly total!: number;

  @ApiProperty({ type: CustomerSchema })
  public readonly customer!: CustomerSchema;
}

export class SaleAndTimeSchema {
  @ApiProperty({ type: 'string' })
  public readonly time!: string;

  @ApiProperty({ type: SaleSchema })
  public readonly sale!: SaleSchema;
}
