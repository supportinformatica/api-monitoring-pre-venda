export interface SalePerDayData {
  date: string;
  quantity: number;
}

export interface SalePerDay {
  sales: SalePerDayData[];
  max: number;
}
