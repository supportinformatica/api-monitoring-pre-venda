import { ConnectionOptions } from 'typeorm';
import * as Settings from '@src/server/settings';

export const sqlServerConnection: ConnectionOptions = {
  type: 'mssql',
  host: Settings.MSSQL_HOST,
  port: Settings.MSSQL_PORT,
  database: Settings.MSSQL_NAME,
  username: Settings.MSSQL_USER,
  password: Settings.MSSQL_PASS,
  options: {
    encrypt: false
  }
};
