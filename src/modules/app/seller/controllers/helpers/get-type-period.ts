import { BadRequestException } from '@nestjs/common';
import { PeriodType } from '@src/modules/app/graphic/interfaces/period-options';

export function getTypePeriod(type: string): PeriodType {
  if (type === 'DAY') return 'DAY';

  if (type === 'WEEK') return 'WEEK';

  if (type === 'MONTH') return 'MONTH';

  throw new BadRequestException('Invalid type format');
}
