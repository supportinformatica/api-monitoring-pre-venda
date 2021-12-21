import { ADMIN_CONNECTION_NAME } from '@src/server/settings';
import { getConnection } from 'typeorm';

export function adminConnection() {
  return getConnection(ADMIN_CONNECTION_NAME);
}
