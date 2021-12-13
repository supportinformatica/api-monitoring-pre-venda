import { ISeller } from '@src/modules/database/interfaces';
import * as http from 'http';

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    admin: ISeller;
    storeId: number;
  }
}
