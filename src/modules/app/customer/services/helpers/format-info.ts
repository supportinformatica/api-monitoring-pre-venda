import { ICustomer } from '@src/modules/database/interfaces';
import { CustomerAndInfo } from '../../interfaces/customer-and-info';

import * as Helpers from '@src/modules/common/helpers';

function getRanking(customers: CustomerAndInfo[]): CustomerAndInfo[] {
  return customers
    .sort((prev, next) => next.totalValue - prev.totalValue)
    .map((seller, index) => ({
      ...seller,
      ranking: index + 1
    }));
}

function getInfo({ sales, id, name }: ICustomer): CustomerAndInfo {
  const values = sales.map(({ total }) => total);

  const totalValue = Helpers.getSum(values);
  const totalSales = sales.length;
  const maxValue = Helpers.getMax(values);
  const customer = { id, name };

  return {
    customer,
    ranking: 0,
    totalSales,
    totalValue,
    maxValue
  };
}

export function formatInfo(customers: ICustomer[]): CustomerAndInfo[] {
  return getRanking(customers.map(customer => getInfo(customer)));
}
