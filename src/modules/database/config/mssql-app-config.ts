import { ConnectionOptions } from 'typeorm';
import * as Settings from '@src/server/settings';

import { resolve } from 'path';

const dir = resolve(__dirname, '..');

const PATH_ENTITIES = `${dir}/models/entities/app/*.{ts,js}`;

const tls = Settings.IS_PRODUCTION ? { rejectUnauthorized: false } : undefined;

export const sqlServerAppConnection: ConnectionOptions = {
  type: 'mssql',
  host: Settings.MSSQL_APP_HOST,
  port: Settings.MSSQL_APP_PORT,
  database: Settings.MSSQL_APP_NAME,
  username: Settings.MSSQL_APP_USER,
  password: Settings.MSSQL_APP_PASS,
  entities: [PATH_ENTITIES],
  cache: {
    type: 'redis',
    duration: Settings.REDIS_EXPIRATION_TIME,
    options: {
      url: Settings.REDIS_URI,
      tls
    }
  },
  options: {
    connectTimeout: Settings.MSSQL_APP_TIMEOUT,
    encrypt: false
  }
};
