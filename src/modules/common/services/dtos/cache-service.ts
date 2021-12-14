import { SalePerDay } from '@src/modules/app/sale/interfaces/sale-per-day';
import { ISellerAndInfo, Seller } from '@src/modules/app/seller/interfaces/seller-and-info';

export type CachePayload = ISellerAndInfo[] | Seller | SalePerDay;

export type HasResponse = 1 | 0;

export interface CacheServiceDTO {
  get: (key: string) => Promise<CachePayload | undefined>;
  has: (key: string) => Promise<HasResponse>;
  set: (key: string, payload: CachePayload) => Promise<'OK' | null>;
}
