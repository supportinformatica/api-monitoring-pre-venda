import { ApiProperty } from '@nestjs/swagger';

export class PeriodOptionsSchema {
  @ApiProperty({ type: 'string', enum: ['DAY', 'WEEK', 'MONTH'], example: 'DAY' })
  public readonly type!: string;

  @ApiProperty({ type: 'integer', example: '8' })
  public readonly quantity!: string;
}
