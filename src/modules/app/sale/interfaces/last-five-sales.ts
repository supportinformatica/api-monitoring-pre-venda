export interface LastFiveSales {
  id: number;
  total: number;
  customer: {
    id: number;
    name: string;
  };
}
