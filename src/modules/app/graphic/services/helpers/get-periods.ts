import { PeriodOptions } from '../../interfaces/period-options';

interface Period {
  from: string;
  to: string;
}

function getPerMonth(weeks: number) {
  return new Array(weeks).fill('').map((_, index) => {
    const start = 30 * (index + 1) - 1;
    const end = 30 * index;

    const from = new Date(new Date().setDate(new Date().getUTCDate() - start)).toLocaleDateString(); //.toISOString();
    const to = new Date(new Date().setDate(new Date().getUTCDate() - end)).toLocaleDateString(); //.toISOString();

    return { from, to };
  });
}

function getPerWeek(weeks: number) {
  return new Array(weeks).fill('').map((_, index) => {
    const start = 8 * (index + 1) - 1;
    const end = 8 * index;

    const from = new Date(new Date().setDate(new Date().getUTCDate() - start)).toLocaleDateString(); //.toISOString();
    const to = new Date(new Date().setDate(new Date().getUTCDate() - end)).toLocaleDateString(); //.toISOString();

    return { from, to };
  });
}

function getPerDay(days: number): Period[] {
  return new Array(days).fill('').map((_, index) => {
    const day = new Date(new Date().setDate(new Date().getUTCDate() - index)).toISOString();

    return { from: day, to: day };
  });
}

export function getPeriods({ quantity, type }: PeriodOptions): Period[] {
  if (type === 'MONTH') return getPerMonth(quantity).reverse();

  if (type === 'WEEK') return getPerWeek(quantity).reverse();

  return getPerDay(quantity).reverse();
}
