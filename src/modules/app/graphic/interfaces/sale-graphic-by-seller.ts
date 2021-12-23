export interface TopFiveCustomers {
  id: number;
  name: string;
  quantitySales: number;
  ranking: number;
}

export interface Sale {
  productsQuantity: number;
  value: number;
  customerId: number;
}

export interface SaleData {
  sales: Sale[];
  date: string;
  quantity: number;
  total: number;
  decreasing: boolean;
  isDefault: boolean;
}

export interface DataTopCustomers {
  data: Array<Pick<SaleData, 'date' | 'quantity'>>;
  id: number;
  ranking: number;
}

export interface SaleGraphicBySeller {
  data: SaleData[];
  dataTopCustomers: DataTopCustomers[];
  totalSales: number;
  mediaSales: number;
  totalValue: number;
  mediaValue: number;
  maxValue: number;
  maxQuantity: number;
  topFiveCustomers: TopFiveCustomers[];
}
