export interface TopFiveCustomers {
  id: number;
  name: string;
  quantitySales: number;
}

export interface Sale {
  productsQuantity: number;
  value: number;
}

export interface Data {
  sales: Sale[];
  date: string;
  quantity: number;
  total: number;
  decreasing: boolean;
}
export interface SaleGraphicBySeller {
  data: Data[];
  totalSales: number;
  mediaSales: number;
  totalValue: number;
  mediaValue: number;
  maxValue: number;
  maxQuantity: number;
  topFiveCustomers: TopFiveCustomers[];
}
