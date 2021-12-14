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
  findInfoBySellerId: (sellerId: number, storeId: number) => Promise<ISale[]>;
}
