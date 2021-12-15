import { ICustomer } from '@src/modules/database/interfaces';

export type CustomerById = Omit<ICustomer, 'sellers' | 'storeId' | 'id' | 'sales'>;
