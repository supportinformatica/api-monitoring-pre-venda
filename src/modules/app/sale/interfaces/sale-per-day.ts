export interface PerDayData {
  date: string;
  quantity: number;
}

export interface SalePerDay {
  sales: PerDayData[];
  max: number;
}

export interface PurchasesPerDay {
  purchases: PerDayData[];
  max: number;
}
