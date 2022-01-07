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
  results: ISale[];
  period: {
    from: string;
    to: string;
  };
}

export interface SeleRepositoryDTO {
  findId: (id: number, storeId: number) => Promise<ISale | undefined>;
  findPurchaseById: (id: number, storeId: number) => Promise<ISale | undefined>;
  findNullSales: () => Promise<ISale[]>;
  findNullSalesByStore: (storeId: number) => Promise<ISale[]>;

  findAllForStore: (storeId: number) => Promise<ISale[]>;
  findLastFiveSalesByStoreId: (storeId: number) => Promise<ISale[]>;
  findInfoByStoreId: (storeId: number, from?: string, to?: string) => Promise<ISale[]>;

  findBySellerPerPeriod: (
    sellerId: number,
    storeId: number,
    from?: string,
    to?: string
  ) => Promise<ISale[]>;

  findByCustomerPerPeriod: (
    sellerId: number,
    storeId: number,
    from?: string,
    to?: string
  ) => Promise<ISale[]>;

  findInfoBySellerId: (
    sellerId: number,
    storeId: number,
    from?: string,
    to?: string
  ) => Promise<ISale[]>;

  findInfoByCustomerId: (
    customerId: number,
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

  findForGraphicByCustomerId: (
    customerId: number,
    storeId: number,
    from: string,
    to: string
  ) => Promise<FindForGraphicResponse>;
}
