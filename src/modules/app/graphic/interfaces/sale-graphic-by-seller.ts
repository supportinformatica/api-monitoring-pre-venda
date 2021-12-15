interface Period {
  start: string;
  end: string;
}

interface TopFiveCustomers {
  id: number;
  name: string;
}

interface Sale {
  productsQuantity: number;
  value: number;
}

interface Data {
  sales: Sale[];
  date: string;
  quantity: number;
  decreasing: boolean;
}

export interface SaleGraphicBySeller {
  data: Data[];
  period: Period;
  totalSales: number;
  mediaSales: number;
  totalValue: number;
  mediaValue: number;
  topFiveCustomers: TopFiveCustomers[];
}
