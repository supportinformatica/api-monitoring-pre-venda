import { ApiProperty } from '@nestjs/swagger';
import { LastFiveSales } from '../interfaces/last-five-sales';

class LastFiveSaleCustomer {
  @ApiProperty({ type: 'number' })
  public readonly id!: number;

  @ApiProperty({ type: 'string' })
  public readonly name!: string;
}

export class LastFiveSalesSchema implements LastFiveSales {
  @ApiProperty({ type: 'number' })
  public readonly id!: number;

  @ApiProperty({ type: 'number' })
  public readonly total!: number;

  @ApiProperty({ type: LastFiveSaleCustomer })
  public readonly customer!: LastFiveSaleCustomer;
}
