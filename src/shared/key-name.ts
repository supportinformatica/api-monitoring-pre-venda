import { QueryPeriod } from '@src/modules/app/sale/repositories/dtos/sale-repository';

type MethodsRepository = 'INFO_BY_SELLER_ID' | 'ALL_BY_SELLER_ID';

type MethodsSellerController = 'SELLER_INFO_SALES_PER_DAY' | 'SELLER_TOP_FIVE' | 'SELLER_INFO';

type MethodsSaleController = 'SALE_ALL_BY_SELLER';

type MethodsController = MethodsSellerController | MethodsSaleController;

type Controller = 'controller';

type Repository = 'repository';

type Module = 'sale' | 'seller';

type Layer = Controller | Repository;

type Method = MethodsController | MethodsRepository;

interface Identifiers {
  storeId: number;
  sellerId?: number;
}

interface Periods {
  days?: number;
  fromTo?: Pick<QueryPeriod, 'params'>;
}

interface KeyNameOptions {
  identifiers: Identifiers;
  layer: Layer;
  module: Module;
  method: Method;
  periods?: Periods;
}

export function getKeyName(options: KeyNameOptions) {
  const { identifiers, periods, layer, method, module } = options;

  const app = 'pre_venda://';
  const store = `@store:${identifiers.storeId}`;
  const path = `@${module}-${layer}:${method}`;

  const seller = identifiers.sellerId ? `@seller:${identifiers.sellerId}` : '';

  const fromTo = periods?.fromTo?.params
    ? `@from:${periods.fromTo.params.from}@to:${periods.fromTo.params.to}`
    : '';

  const days = periods?.days ? `@days:${periods.days}` : '';

  return `${app}${fromTo}${days}${store}${seller}${path}`;
}
