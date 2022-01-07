import { ISale } from '@src/modules/database/interfaces';
import { IS_PRODUCTION } from '@src/server/settings';
import { SaleAndTime } from '../../../../app/sale/interfaces/sale-and-time';

function getDays(diff: number) {
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const label = days > 1 ? 'dias' : 'dia';

  return `${days} ${label}`;
}

function getHours(diff: number) {
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const label = hours > 1 ? 'horas' : 'hora';

  return `${hours} ${label}`;
}

function getMinutes(diff: number) {
  const minutes = Math.floor(diff / 1000 / 60);
  const label = minutes > 1 ? 'minutos' : 'minuto';

  return `${minutes} ${label}`;
}

function getSeconds(diff: number) {
  const seconds = Math.floor(diff / 1000);
  const label = seconds > 1 ? 'segundos' : 'segundo';

  return `${seconds} ${label}`;
}

function getTime(nullSale: ISale): string {
  const saleDate = new Date(nullSale.dateSync);
  const zeroOrThreeHours = IS_PRODUCTION ? 10800000 : 0;
  const now = new Date().valueOf() - zeroOrThreeHours;

  const millisecondsDiff = Math.abs(now - saleDate.valueOf());

  if (millisecondsDiff <= 60000) return getSeconds(millisecondsDiff);

  if (millisecondsDiff <= 7200000) return getMinutes(millisecondsDiff);

  if (millisecondsDiff <= 432000000) return getHours(millisecondsDiff);

  return getDays(millisecondsDiff);
}

export function formatSaleAndTime(sale: ISale): SaleAndTime {
  return {
    sale,
    time: getTime(sale)
  };
}
