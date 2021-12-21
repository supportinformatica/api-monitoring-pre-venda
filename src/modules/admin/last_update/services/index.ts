import { Injectable } from '@nestjs/common';
import { CustomSaleRepository } from '@src/modules/app/sale/repositories';
import { StoreService } from '@src/modules/app/store/services';
import { SendWarn } from '@src/modules/common/services/dtos/sms-service';
import { SmsService } from '@src/modules/common/services/sms-service';
import { WarnLastUpdate } from '../interfaces/warn-last-update';
import { LastUpdateRepository } from '../repositories';
import { LastUpdateServiceDTO } from './dtos/last-update-service';
import { getIdsAndQuantity } from './helpers/get-ids-and-quantity';

@Injectable()
export class LastUpdateService implements LastUpdateServiceDTO {
  constructor(
    private readonly repository: LastUpdateRepository,
    private readonly saleRepository: CustomSaleRepository,
    private readonly storeService: StoreService,
    private readonly smsService: SmsService
  ) {}

  private async sendWarnSales(sales: WarnLastUpdate[]) {
    const promises = sales.map(({ storeId }) => this.storeService.findById(storeId));

    const stores = await Promise.all(promises);

    const data = stores.map(storeOrError => {
      if (storeOrError.isLeft()) return;

      const store = storeOrError.value;

      const warn = sales.find(({ storeId }) => storeId === store.storeId);

      if (!warn) return;

      return { name: store.name, quantity: warn.quantity };
    });

    const sendWarns = data.filter(value => value !== undefined);

    if (!sendWarns.length) return;

    this.smsService.sendWarnSales(sendWarns as SendWarn[]);
  }

  private async sendWarnSync(sales: WarnLastUpdate[]) {
    const promises = sales.map(({ storeId }) => this.storeService.findById(storeId));

    const stores = await Promise.all(promises);

    const data = stores.map(storeOrError => {
      if (storeOrError.isLeft()) return;

      const store = storeOrError.value;

      const warn = sales.find(({ storeId }) => storeId === store.storeId);

      if (!warn) return;

      return { name: store.name, quantity: warn.quantity };
    });

    const sendWarns = data.filter(value => value !== undefined);

    if (!sendWarns.length) return;

    this.smsService.sendWarnSync(sendWarns as SendWarn[]);
  }

  public async verifyLastUpdate() {
    const nullSales = await this.saleRepository.findNullSales();

    if (!nullSales.length) return;

    const lastSyncs = await this.repository.findAll();

    const { warnSale, warnSync } = getIdsAndQuantity(nullSales, lastSyncs);

    if (warnSale.length) this.sendWarnSales(warnSale);

    if (warnSync.length) this.sendWarnSync(warnSync);
  }
}
