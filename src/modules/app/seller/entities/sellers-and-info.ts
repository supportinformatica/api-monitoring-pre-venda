import { ApiProperty } from '@nestjs/swagger';
import { ISellerAndInfo } from '../interfaces/seller-and-info';
import { Seller } from './seller';

export class SellersAndInfo implements ISellerAndInfo {
  @ApiProperty({ type: Seller })
  public readonly seller!: Seller;

  @ApiProperty({ type: 'integer' })
  public readonly totalCustomers!: number;

  @ApiProperty({ type: 'integer' })
  public readonly totalSales!: number;

  @ApiProperty({ type: 'number' })
  public readonly totalValue!: number;

  @ApiProperty({ type: 'integer' })
  public readonly ranking!: number;
}
