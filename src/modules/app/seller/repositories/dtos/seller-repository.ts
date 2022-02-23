import { ISeller, ISellerCustomer } from '@src/modules/database/interfaces';
import { UpdateResult } from 'typeorm';
import { Settings } from '../../interfaces/settings';

export interface SellerRepositoryDTO {
  toggleSettings: (id: number, storeId: number, settings: Settings) => Promise<UpdateResult>;
  changeMaxDiscount: (id: number, storeId: number, discount: number) => Promise<UpdateResult>;

  findCustomers: (storeId: number) => Promise<ISellerCustomer[]>;
  findInfo: (storeId: number) => Promise<ISeller[]>;
  findById: (id: number, storeId: number) => Promise<ISeller | undefined>;
  findSettings: (id: number, storeId: number) => Promise<ISeller | undefined>;
  findAllForStore: (storeId: number) => Promise<ISeller[]>;
}
