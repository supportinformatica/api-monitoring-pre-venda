import { redisClient } from '@src/server/config';
import { REDIS_PX_MODE, REDIS_EXPIRATION_TIME } from '@src/server/settings';
import { CachePayload, CacheServiceDTO, HasResponse } from './dtos/cache-service';

export class CacheService implements CacheServiceDTO {
  constructor(private readonly cache = redisClient) {}

  private toString(payload: CachePayload): string {
    return JSON.stringify(payload);
  }

  private toJson(payload: string): CachePayload {
    return JSON.parse(payload);
  }

  public set(key: string, payload: CachePayload): Promise<'OK' | null> {
    return this.cache.set(key, this.toString(payload), REDIS_PX_MODE, REDIS_EXPIRATION_TIME);
  }

  public async get(key: string): Promise<CachePayload | undefined> {
    const cache = await this.cache.get(key);

    if (!cache) return;

    return this.toJson(cache);
  }

  public has(key: string): Promise<HasResponse> {
    return this.cache.exists(key) as Promise<HasResponse>;
  }
}
