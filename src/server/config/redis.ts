import Redis from 'ioredis';
import * as Settings from '../settings';

export const redisClient = new Redis(Settings.REDIS_URI, {
  connectTimeout: Settings.REDIS_TIMEOUT,
  tls: {
    rejectUnauthorized: false
  }
});
