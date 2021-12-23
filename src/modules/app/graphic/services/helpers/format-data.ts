import { ISale } from '@src/modules/database/interfaces';
import {
  Sale,
  SaleData,
  TopFiveCustomers,
  SaleGraphicBySeller,
  DataTopCustomers
} from '../../interfaces/sale-graphic-by-seller';

import { PurchasesGraphic, PurchaseData } from '../../interfaces/purchases-graphic-by-customer';

import * as Helpers from '@src/modules/common/helpers';
import { FindForGraphicResponse } from '@src/modules/app/sale/repositories/dtos/sale-repository';

function getDecreasing(data: SaleData[] | PurchaseData[]): SaleData[] | PurchaseData[] {
  let last: SaleData | PurchaseData = data[0];

  return [
    last,
    ...data.slice(1).map(value => {
      const results = {
        ...value,
        decreasing: value.quantity < last.quantity || !value.quantity
      };

      last = value;

      return results;
    })
  ];
}

function getTopFiveCustomers(payload: FindForGraphicResponse[]): TopFiveCustomers[] {
  const customers: { name: string; id: number }[] = [];

  let topFiveCustomers: TopFiveCustomers[] = [];

  for (const data of payload) {
    customers.push(
      ...data.results.map(({ customer: { name, id } }) => ({
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
        quantitySales: 1,
        ranking: 0
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

  return topFiveCustomers
    .sort((prev, next) => next.quantitySales - prev.quantitySales)
    .slice(0, 5)
    .map((value, index) => ({
      ...value,
      ranking: index + 1
    }));
}

function formatSale({ products, total, customer }: ISale): Sale {
  return {
    productsQuantity: products.length,
    value: total,
    customerId: customer.id
  };
}

function formatSaleData(payload: FindForGraphicResponse): SaleData {
  const sales = payload.results.map(sale => formatSale(sale));

  const date = Helpers.formatDateDayAndMonth(new Date(payload.period.to));

  const quantity = sales.length;

  const values = sales.map(sale => sale.value);

  const total = Helpers.getSum(values);

  const isDefault = !sales.length;

  return {
    date,
    decreasing: true,
    quantity,
    sales,
    total,
    isDefault
  };
}

function formatPurchaseData(payload: FindForGraphicResponse): PurchaseData {
  const date = Helpers.formatDateDayAndMonth(new Date(payload.period.to));

  const values = payload.results.map(({ total }) => total);

  const quantity = values.length;

  const total = Helpers.getSum(values);

  const isDefault = !quantity;

  return {
    date,
    decreasing: true,
    quantity,
    total,
    isDefault
  };
}

function formatDataTopCustomers(topFive: TopFiveCustomers[], data: SaleData[]): DataTopCustomers[] {
  return topFive.map(customer => {
    return {
      id: customer.id,
      ranking: customer.ranking,
      data: data.map(payload => {
        if (payload.isDefault)
          return {
            date: payload.date,
            quantity: payload.quantity
          };

        const sales = payload.sales.filter(sale => sale.customerId === customer.id);
        const quantity = sales.length;
        const date = payload.date;

        return { quantity, date };
      })
    };
  });
}

export function formatSaleGraphic(
  payload: FindForGraphicResponse[],
  quantityPeriod: number
): SaleGraphicBySeller {
  const topFiveCustomers = getTopFiveCustomers(payload);

  const data = getDecreasing(payload.map(data => formatSaleData(data))) as SaleData[];

  const values = data.map(({ total }) => total);
  const quantities = data.map(({ quantity }) => quantity);

  const maxValue = Helpers.getMax(values);
  const maxQuantity = Helpers.getMax(quantities);

  const totalValue = Helpers.getSum(values);
  const totalSales = Helpers.getSum(quantities);

  const mediaSales = Helpers.getMedia(totalSales, quantityPeriod);
  const mediaValue = Helpers.getMedia(totalValue, quantityPeriod);

  const dataTopCustomers = formatDataTopCustomers(topFiveCustomers, data);

  return {
    data,
    dataTopCustomers,
    maxQuantity,
    maxValue,
    mediaSales,
    mediaValue,
    topFiveCustomers,
    totalSales,
    totalValue
  };
}

export function formatPurchasesGraphic(
  payload: FindForGraphicResponse[],
  quantityPeriod: number
): PurchasesGraphic {
  const data = getDecreasing(payload.map(data => formatPurchaseData(data))) as PurchaseData[];

  const values = data.map(({ total }) => total);
  const quantities = data.map(({ quantity }) => quantity);

  const maxValue = Helpers.getMax(values);
  const maxQuantity = Helpers.getMax(quantities);

  const totalValue = Helpers.getSum(values);
  const totalPurchases = Helpers.getSum(quantities);

  const mediaPurchases = Helpers.getMedia(totalPurchases, quantityPeriod);
  const mediaValue = Helpers.getMedia(totalValue, quantityPeriod);

  return {
    data,
    maxQuantity,
    maxValue,
    mediaPurchases,
    mediaValue,
    totalPurchases,
    totalValue
  };
}
