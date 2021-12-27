export interface SaleDataByStore {
  date: string;
  quantity: number;
  total: number;
  decreasing: boolean;
  isDefault: boolean;
}

export interface SaleGraphicByStore {
  data: SaleDataByStore[];
  totalSales: number;
  mediaSales: number;
  totalValue: number;
  mediaValue: number;
  maxValue: number;
  maxQuantity: number;
}
