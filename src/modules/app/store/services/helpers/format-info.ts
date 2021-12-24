import { ICustomer, ISale, ISeller, IStore } from '@src/modules/database/interfaces';
import { StoreAndInfo } from '../../interfaces/store-and-info';
import { getMax, getSum } from '@src/modules/common/helpers';

export function formatInfo(
  store: IStore,
  sellers: ISeller[],
  customers: ICustomer[],
  sales: ISale[]
): StoreAndInfo {
  const { name } = store;
  const totalSellers = sellers.length;
  const totalCustomers = customers.length;
  const totalSales = sales.length;

  const values = sales.map(({ total }) => total);

  const totalValue = getSum(values);

  const maxValue = getMax(values);

  return {
    store: { name },
    maxValue,
    totalCustomers,
    totalSales,
    totalSellers,
    totalValue
  };
}
