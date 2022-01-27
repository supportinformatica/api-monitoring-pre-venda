export interface SaleTimeLine {
  id: number;
  total: number;
  time: string;
  lat: string;
  long: string;
}

export interface TimeLine {
  sales: SaleTimeLine[];
}
