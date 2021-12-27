import { CustomerAndInfo } from '@src/modules/app/customer/interfaces/customer-and-info';
import { PurchasesGraphic } from '@src/modules/app/graphic/interfaces/purchases-graphic-by-customer';
import { SaleGraphicBySeller } from '@src/modules/app/graphic/interfaces/sale-graphic-by-seller';
import { SaleGraphicByStore } from '@src/modules/app/graphic/interfaces/sale-graphic-by-store';
import { SaleBySeller } from '@src/modules/app/sale/interfaces/sale-by-seller';
import { PurchasesPerDay, SalePerDay } from '@src/modules/app/sale/interfaces/sale-per-day';
import { ISellerAndInfo, Seller } from '@src/modules/app/seller/interfaces/seller-and-info';

type SaleCachePayload = SalePerDay | PurchasesPerDay | SaleBySeller[];

type SellerCachePayload = Seller | ISellerAndInfo[] | SaleGraphicBySeller;

type CustomerCachePayload = CustomerAndInfo[] | PurchasesGraphic;

type StoreCachePayload = SaleGraphicByStore;

export type CachePayload =
  | SaleCachePayload
  | SellerCachePayload
  | CustomerCachePayload
  | StoreCachePayload;

export type HasResponse = 1 | 0;

export interface CacheServiceDTO {
  get: (key: string) => Promise<CachePayload | undefined>;
  has: (key: string) => Promise<HasResponse>;
  set: (key: string, payload: CachePayload) => Promise<'OK' | null>;
}
