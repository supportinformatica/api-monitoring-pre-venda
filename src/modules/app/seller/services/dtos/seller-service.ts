import { ISellerAndInfo } from '../../interfaces/seller-and-info';

export interface SellerServiceDTO {
  findInfo: (storeId: number) => Promise<ISellerAndInfo[]>;
}
