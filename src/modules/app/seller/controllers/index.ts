import { Controller, Get } from '@nestjs/common';
import { StoreId } from '@src/modules/common/guard/token';
import { CacheService } from '@src/modules/common/services/cache-service';
import { SellerService } from '../services';

@Controller('sellers')
export class SellerController {
  constructor(private readonly service: SellerService, private readonly cache: CacheService) {}

  @Get('')
  public async findInfo(@StoreId() storeId: number) {
    const keyName = `pre_venda://@${storeId}:sellers/info`;

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const infoSellers = await this.service.findInfo(storeId);

    this.cache.set(keyName, infoSellers).then(res => {
      if (res === 'OK') return console.log('Caching successfully');

      // TODO: export on log

      return console.log('Caching error');
    });

    return infoSellers;
  }
}
