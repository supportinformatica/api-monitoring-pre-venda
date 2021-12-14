import { ApiPropertyOptional } from '@nestjs/swagger';

export class PeriodSchema {
  @ApiPropertyOptional({ type: 'string', example: '2021-10-15' })
  public readonly from?: string;

  @ApiPropertyOptional({ type: 'string', example: '2021-12-01' })
  public readonly to?: string;
}
