import { ConnectionOptions } from 'typeorm';
import * as Settings from '@src/server/settings';

import { resolve } from 'path';

const dir = resolve(__dirname, '..');

const PATH_ENTITIES = `${dir}/models/entities/admin/*.{ts,js}`;

const tls = Settings.IS_PRODUCTION ? { rejectUnauthorized: false } : undefined;

export const sqlServerAdminConnection: ConnectionOptions = {
  type: 'mssql',
  name: Settings.MSSQL_ADMIN_NAME,
  host: Settings.MSSQL_ADMIN_HOST,
  port: Settings.MSSQL_ADMIN_PORT,
  database: Settings.MSSQL_ADMIN_NAME,
  username: Settings.MSSQL_ADMIN_USER,
  password: Settings.MSSQL_ADMIN_PASS,
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
    encrypt: false
  }
};
