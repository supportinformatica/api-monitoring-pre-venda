import { ApiProperty } from '@nestjs/swagger';

import { PurchaseData, PurchasesGraphic } from '../interfaces/purchases-graphic-by-customer';

class PurchaseDataSchema implements PurchaseData {
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

export class PurchaseGraphicBySellerSchema implements PurchasesGraphic {
  @ApiProperty({ isArray: true, type: PurchaseDataSchema })
  public readonly data!: PurchaseDataSchema[];

  @ApiProperty({ type: 'number' })
  public readonly totalPurchases!: number;

  @ApiProperty({ type: 'number' })
  public readonly mediaPurchases!: number;

  @ApiProperty({ type: 'number' })
  public readonly totalValue!: number;

  @ApiProperty({ type: 'number' })
  public readonly mediaValue!: number;

  @ApiProperty({ type: 'number' })
  public readonly maxValue!: number;

  @ApiProperty({ type: 'number' })
  public readonly maxQuantity!: number;
}
