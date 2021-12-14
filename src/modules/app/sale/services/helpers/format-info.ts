import { ISale } from '@src/modules/database/interfaces';
import { SaleAndInfo } from '../../interfaces/sale-and-info';

function getMaxValue(values: number[]): number {
  return values.reduce((max, curr) => Math.max(max, curr));
}

function getTotalValue(values: number[]): number {
  return values.reduce((acc, curr) => acc + curr);
}

function getMediaValue(values: number[], total: number): number {
  return Number((total / values.length).toFixed(2));
}

function getBeginningPeriod(sales: ISale[]): Date {
  return new Date(sales[0].date);
}

function getEndPeriod(sales: ISale[]): Date {
  return new Date(sales[sales.length - 1].date);
}

function getDiffDays(beginningPeriod: Date, getEndPeriod: Date): number {
  return (getEndPeriod.valueOf() - beginningPeriod.valueOf()) / 24 / 60 / 60 / 1000;
}

function getMediaSales(totalSales: number, diffDays: number): number {
  if (!diffDays) return totalSales;

  return Number((totalSales / diffDays).toFixed(2));
}

export function formatDate(date: Date): string {
  const [usDate] = date.toISOString().split('T');

  return usDate.split('-').reverse().join('/');
}

export function formatInfo(sales: ISale[]): SaleAndInfo {
  if (!sales.length) {
    return {
      beginningPeriod: formatDate(new Date('2021-06-01')),
      endPeriod: formatDate(new Date()),
      maxValue: 0,
      mediaSales: 0,
      totalSales: 0,
      totalValue: 0,
      mediaValue: 0
    };
  }

  const values = sales.map(sale => sale.total);

  const maxValue = getMaxValue(values);

  const totalValue = getTotalValue(values);

  const mediaValue = getMediaValue(values, totalValue);

  const beginningPeriod = getBeginningPeriod(sales);

  const endPeriod = getEndPeriod(sales);

  const diffDays = getDiffDays(beginningPeriod, endPeriod);

  const totalSales = sales.length;

  const mediaSales = getMediaSales(totalSales, diffDays);

  return {
    beginningPeriod: formatDate(beginningPeriod),
    endPeriod: formatDate(endPeriod),
    maxValue,
    mediaSales,
    totalSales,
    totalValue,
    mediaValue
  };
}
