import { ConnectionOptions } from 'typeorm';
import * as Settings from '@src/server/settings';

import { resolve } from 'path';

const dir = resolve(__dirname, '..');

const PATH_ENTITIES = `${dir}/models/entities/*.{ts,js}`;

const tls = Settings.IS_PRODUCTION ? { rejectUnauthorized: false } : undefined;

export const sqlServerConnection: ConnectionOptions = {
  type: 'mssql',
  host: Settings.MSSQL_HOST,
  port: Settings.MSSQL_PORT,
  database: Settings.MSSQL_NAME,
  username: Settings.MSSQL_USER,
  password: Settings.MSSQL_PASS,
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
