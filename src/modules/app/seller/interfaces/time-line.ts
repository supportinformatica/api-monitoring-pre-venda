export interface SaleTimeLine {
  time: string;
  lat: string;
  long: string;
  sale?: {
    id: number;
    total: number;
  };
}

export interface TimeLine {
  sales: SaleTimeLine[];
  distance: string;
  total: number;
}
