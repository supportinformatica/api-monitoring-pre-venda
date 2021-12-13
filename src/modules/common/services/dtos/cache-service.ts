import { ISellerAndInfo, Seller } from '@src/modules/app/seller/interfaces/seller-and-info';

export type CachePayload = ISellerAndInfo[] | Seller;

export type HasResponse = 1 | 0;

export interface CacheServiceDTO {
  get: (key: string) => Promise<CachePayload | undefined>;
  has: (key: string) => Promise<HasResponse>;
  set: (key: string, payload: CachePayload) => Promise<'OK' | null>;
}
