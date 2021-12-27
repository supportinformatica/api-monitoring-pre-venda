import { QueryPeriod } from '@src/modules/app/sale/repositories/dtos/sale-repository';

type MethodsSalesRepository =
  | 'INFO_BY_SELLER_ID'
  | 'INFO_BY_CUSTOMER_ID'
  | 'ALL_BY_SELLER_ID'
  | 'FOR_GRAPHIC_BY_SELLER_ID'
  | 'ALL_FOR_STORE'
  | 'LAST_FIVE_SALES_BY_STORE_ID';

type MethodsRepository = MethodsSalesRepository;

type MethodsSellerController =
  | 'SELLER_INFO_SALES_PER_DAY'
  | 'SELLER_TOP_FIVE'
  | 'SELLER_INFO'
  | 'SELLER_SALE_GRAPHIC';

type MethodsSaleController = 'SALE_ALL_BY_SELLER';

type MethodsCustomerController =
  | 'CUSTOMER_TOP_FIVE'
  | 'CUSTOMER_INFO'
  | 'CUSTOMER_INFO_PURCHASES_PER_DAY'
  | 'CUSTOMER_PURCHASES_GRAPHIC';

type MethodsController =
  | MethodsSellerController
  | MethodsSaleController
  | MethodsCustomerController;

type Controller = 'controller';

type Repository = 'repository';

type Module = 'sale' | 'seller' | 'customer';

type Layer = Controller | Repository;

type Method = MethodsController | MethodsRepository;

interface Identifiers {
  storeId: number;
  customerId?: number;
  sellerId?: number;
}

interface Periods {
  days?: number;
  fromTo?: Pick<QueryPeriod, 'params'>;
  type?: 'DAY' | 'WEEK' | 'MONTH';
  quantity?: number;
}

interface KeyNameOptions {
  identifiers: Identifiers;
  layer: Layer;
  module: Module;
  method: Method;
  periods?: Periods;
}

function getFromTo({ fromTo }: Periods): string {
  if (!fromTo) return '';

  const [from] = fromTo.params.from.split('T');
  const [to] = fromTo.params.to.split('T');

  return `@from:${from}@to:${to}`;
}

export function getKeyName(options: KeyNameOptions) {
  const { identifiers, periods, layer, method, module } = options;

  const app = 'pre_venda://';
  const store = `@store:${identifiers.storeId}`;
  const path = `@${module}-${layer}:${method}`;

  const seller = identifiers.sellerId ? `@seller:${identifiers.sellerId}` : '';

  const customer = identifiers.customerId ? `@customer:${identifiers.customerId}` : '';

  const fromTo = periods ? getFromTo(periods) : '';

  const days = periods?.days ? `@days:${periods.days}` : '';

  const type = periods?.type ? `@type:${periods.type}` : '';

  const quantity = periods?.quantity ? `@quantity:${periods.quantity}` : '';

  return `${app}${fromTo}${days}${type}${quantity}${store}${seller}${customer}${path}`;
}
