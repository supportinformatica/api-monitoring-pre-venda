import { ISale } from '@src/modules/database/interfaces';

type From = string;
type To = string;
type Query = string;

export interface QueryPeriod {
  query: Query;
  params: {
    from: From;
    to: To;
  };
}

export interface SeleRepositoryDTO {
  findAllBySellerId: (sellerId: number, storeId: number) => Promise<ISale[]>;
  findInfoBySellerId: (
    sellerId: number,
    storeId: number,
    from?: string,
    to?: string
  ) => Promise<ISale[]>;
}
