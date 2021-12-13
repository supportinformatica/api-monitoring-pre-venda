import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StoreId } from '@src/modules/common/guard/token';
import { CacheService } from '@src/modules/common/services/cache-service';
import { SellerService } from '../services';
import { SellersAndInfo } from '../entities/sellers-and-info';
import { Seller } from '../entities/seller';

@Controller('sellers')
@ApiTags('vendedores')
@ApiBearerAuth('admin')
export class SellerController {
  constructor(private readonly service: SellerService, private readonly cache: CacheService) {}

  @Get('')
  @ApiOkResponse({ isArray: true, type: SellersAndInfo })
  public async findInfo(@StoreId() storeId: number) {
    const keyName = `pre_venda://@${storeId}:sellers/info`;

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const infoSellers = (await this.service.findInfo(storeId)).sort((prev, next) =>
      prev.seller.name.localeCompare(next.seller.name)
    );

    this.cache.set(keyName, infoSellers).then(res => {
      if (res === 'OK') return console.log('Caching successfully');

      // TODO: export on log

      return console.log('Caching error');
    });

    return infoSellers;
  }

  @Get('top-five')
  @ApiOkResponse({ isArray: true, type: SellersAndInfo })
  public async findTopFive(@StoreId() storeId: number) {
    const keyName = `pre_venda://@${storeId}:sellers/info/top-five`;

    if (await this.cache.has(keyName)) {
      return this.cache.get(keyName);
    }

    const infoTopFive = (await this.service.findInfo(storeId)).slice(0, 5);

    this.cache.set(keyName, infoTopFive).then(res => {
      if (res === 'OK') return console.log('Caching successfully');

      return console.log('Caching error');
    });

    return infoTopFive;
  }

  @Get(':id')
  @ApiOkResponse({ type: Seller })
  @ApiNotFoundResponse({ description: 'Seller is not found' })
  public async findById(@Param('id', ParseIntPipe) id: number, @StoreId() storeId: number) {
    const sellerOrError = await this.service.findById(id, storeId);

    if (sellerOrError.isLeft()) throw sellerOrError.value;

    return sellerOrError.value;
  }
}
