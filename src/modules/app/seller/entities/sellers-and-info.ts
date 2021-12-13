import { ApiProperty } from '@nestjs/swagger';
import { ISellerAndInfo, Seller as ISeller } from '../interfaces/seller-and-info';

class Seller implements ISeller {
  @ApiProperty({ type: 'integer' })
  public readonly id!: number;

  @ApiProperty({ type: 'string' })
  public readonly email!: string;

  @ApiProperty({ type: 'string' })
  public readonly name!: string;
}

export class SellersAndInfo implements ISellerAndInfo {
  @ApiProperty({ type: Seller })
  public readonly seller!: ISeller;

  @ApiProperty({ type: 'integer' })
  public readonly totalCustomers!: number;

  @ApiProperty({ type: 'integer' })
  public readonly totalSales!: number;

  @ApiProperty({ type: 'number' })
  public readonly totalValue!: number;

  @ApiProperty({ type: 'integer' })
  public readonly ranking!: number;
}
