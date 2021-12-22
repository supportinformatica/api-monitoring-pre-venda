export interface SaleAndInfoBySeller {
  beginningPeriod: string;
  endPeriod: string;
  totalSales: number;
  mediaSales: number;
  totalValue: number;
  mediaValue: number;
  maxValue: number;
}

export interface SaleAndInfoByCustomer
  extends Omit<SaleAndInfoBySeller, 'totalSales' | 'mediaSales'> {
  totalPurchases: number;
  mediaPurchases: number;
}
