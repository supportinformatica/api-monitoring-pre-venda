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

export interface FindForGraphicResponse {
  sales: ISale[];
  period: {
    from: string;
    to: string;
  };
}

export interface SeleRepositoryDTO {
  findId: (id: number, storeId: number) => Promise<ISale | undefined>;
  findAllBySellerId: (sellerId: number, storeId: number) => Promise<ISale[]>;
  findInfoBySellerId: (
    sellerId: number,
    storeId: number,
    from?: string,
    to?: string
  ) => Promise<ISale[]>;

  findForGraphicBySellerId: (
    sellerId: number,
    storeId: number,
    from: string,
    to: string
  ) => Promise<FindForGraphicResponse>;
}
