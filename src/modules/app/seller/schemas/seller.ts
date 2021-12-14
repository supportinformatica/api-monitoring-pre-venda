import { ApiProperty } from '@nestjs/swagger';
import { Seller as ISeller } from '../interfaces/seller-and-info';

export class Seller implements ISeller {
  @ApiProperty({ type: 'integer' })
  public readonly id!: number;

  @ApiProperty({ type: 'string' })
  public readonly email!: string;

  @ApiProperty({ type: 'string' })
  public readonly name!: string;
}
