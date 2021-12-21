import { APP_CONNECTION_NAME } from '@src/server/settings';
import { getConnection } from 'typeorm';

export function appConnection() {
  return getConnection(APP_CONNECTION_NAME);
}
