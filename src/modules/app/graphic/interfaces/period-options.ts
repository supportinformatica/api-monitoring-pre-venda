export type PeriodType = 'DAY' | 'WEEK' | 'MONTH';

export interface PeriodOptions {
  type: PeriodType;
  quantity: number;
}
