import { NotFoundException } from '@nestjs/common';
import { Either } from '@src/shared/either';
import { ISellerAndInfo, Seller } from '../../interfaces/seller-and-info';
import { Settings } from '../../interfaces/settings';
import { TimeLine } from '../../interfaces/time-line';

export type FindResponse = Either<NotFoundException, Seller | Settings>;

export type FindSettings = Either<NotFoundException, Settings>;

export type ToggleResponse = Either<NotFoundException, boolean>;
export type DiscountResponse = Either<NotFoundException, number>;

export type SettingProperty = 'canChangePrice' | 'useWallet' | 'admin';

export interface SellerServiceDTO {
  findTimeLine: (id: number, storeId: number) => Promise<TimeLine>;
  findInfo: (storeId: number) => Promise<ISellerAndInfo[]>;
  findById: (id: number, storeId: number) => Promise<FindResponse>;
  findSettings: (id: number, storeId: number) => Promise<FindSettings>;

  changeMaxDiscount: (id: number, storeId: number, discount: number) => Promise<DiscountResponse>;
  toggleSetting: (id: number, storeId: number, setting: SettingProperty) => Promise<ToggleResponse>;
}
