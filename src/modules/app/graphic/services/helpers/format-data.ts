import { ISale } from '@src/modules/database/interfaces';
import {
  Sale,
  Data,
  TopFiveCustomers,
  SaleGraphicBySeller
} from '../../interfaces/sale-graphic-by-seller';

import * as Helpers from '@src/modules/common/helpers';
import { FindForGraphicResponse } from '@src/modules/app/sale/repositories/dtos/sale-repository';

function getDecreasing(data: Data[]): Data[] {
  let last: Data = data[0];

  return data.slice(1).map(value => {
    const results = {
      ...value,
      decreasing: value.quantity < last.quantity || !value.quantity
    };

    last = value;

    return results;
  });
}

function getTopFiveCustomers(payload: FindForGraphicResponse[]): TopFiveCustomers[] {
  const customers: { name: string; id: number }[] = [];

  let topFiveCustomers: TopFiveCustomers[] = [];

  for (const data of payload) {
    customers.push(
      ...data.sales.map(({ customer: { name, id } }) => ({
        name,
        id
      }))
    );
  }

  for (const customer of customers) {
    const customerFound = topFiveCustomers.find(({ id }) => id === customer.id);

    if (!customerFound) {
      const topCustomer: TopFiveCustomers = {
        ...customer,
        quantitySales: 1
      };

      topFiveCustomers.push(topCustomer);

      continue;
    }

    const customersFiltered = topFiveCustomers.filter(({ id }) => id !== customer.id);

    const topCustomer: TopFiveCustomers = {
      ...customerFound,
      quantitySales: customerFound.quantitySales + 1
    };

    customersFiltered.push(topCustomer);

    topFiveCustomers = customersFiltered;
  }

  return topFiveCustomers.sort((prev, next) => next.quantitySales - prev.quantitySales).slice(0, 5);
}

function formatSale({ products, total }: ISale): Sale {
  return {
    productsQuantity: products.length,
    value: total
  };
}

function formatData(payload: FindForGraphicResponse): Data {
  const sales = payload.sales.map(sale => formatSale(sale));

  const date = Helpers.formatDateDayAndMonth(new Date(payload.period.to));

  const quantity = sales.length;

  const values = sales.map(sale => sale.value);

  const total = Helpers.getSum(values);

  return {
    date,
    decreasing: true,
    quantity,
    sales,
    total
  };
}

function fillEmptyData(payload: Data[], dates: string[]): Data[] {
  return dates.map(value => {
    const date = Helpers.formatDateDayAndMonth(new Date(value));

    const data = payload.find(data => data.date === date);

    if (data) return data;

    return {
      date,
      decreasing: true,
      quantity: 0,
      sales: [],
      total: 0
    };
  });
}

export function formatSaleGraphic(
  payload: FindForGraphicResponse[],
  quantityPeriod: number
): SaleGraphicBySeller {
  const topFiveCustomers = getTopFiveCustomers(payload);

  const data = fillEmptyData(
    getDecreasing(payload.map(data => formatData(data))),
    payload.map(({ period }) => period.to)
  );

  const values = data.map(({ total }) => total);
  const quantities = data.map(({ quantity }) => quantity);

  const maxValue = Helpers.getMax(values);
  const maxQuantity = Helpers.getMax(quantities);

  const totalValue = Helpers.getSum(values);
  const totalSales = Helpers.getSum(quantities);

  const mediaSales = Helpers.getMedia(totalSales, quantityPeriod);
  const mediaValue = Helpers.getMedia(totalValue, quantityPeriod);

  return {
    data,
    maxQuantity,
    maxValue,
    mediaSales,
    mediaValue,
    topFiveCustomers,
    totalSales,
    totalValue
  };
}
