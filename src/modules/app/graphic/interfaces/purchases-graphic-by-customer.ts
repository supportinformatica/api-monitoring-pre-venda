export interface PurchaseData {
  date: string;
  quantity: number;
  total: number;
  decreasing: boolean;
  isDefault: boolean;
}

export interface PurchasesGraphic {
  data: PurchaseData[];
  totalPurchases: number;
  mediaPurchases: number;
  totalValue: number;
  mediaValue: number;
  maxValue: number;
  maxQuantity: number;
}
