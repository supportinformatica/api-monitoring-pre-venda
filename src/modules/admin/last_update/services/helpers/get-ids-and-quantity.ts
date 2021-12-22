import { ILastUpdate, ISale } from '@src/modules/database/interfaces';
import { IdsAndQuantity } from '../../interfaces/ids-and-quantity';
import { WarnLastUpdate } from '../../interfaces/warn-last-update';

function getIds(
  nullSales: ISale[],
  lastSyncs: ILastUpdate[]
): { warnSyncIds: number[]; warnSaleIds: number[] } {
  const warnSyncIds: number[] = [];
  const warnSaleIds: number[] = [];

  for (const nullSale of nullSales) {
    const lastSync = lastSyncs.find(({ storeId }) => storeId === nullSale.storeId);

    if (!lastSync) continue;

    const syncDate = new Date(lastSync.date);
    const saleDate = new Date(nullSale.dateSync);

    const millisecondsDiff = Math.abs(syncDate.valueOf() - saleDate.valueOf());
    const minutesDiff = millisecondsDiff / 1000 / 60;

    if (minutesDiff < 30) continue;

    if (syncDate > saleDate) {
      warnSaleIds.push(nullSale.storeId);

      continue;
    }

    warnSyncIds.push(lastSync.storeId);
  }

  return { warnSaleIds, warnSyncIds };
}

export function getIdsAndQuantity(nullSales: ISale[], lastSyncs: ILastUpdate[]): IdsAndQuantity {
  const warnSale: WarnLastUpdate[] = [];
  const warnSync: WarnLastUpdate[] = [];

  const { warnSaleIds, warnSyncIds } = getIds(nullSales, lastSyncs);

  const setSalesIds = new Set(warnSaleIds);
  const setSyncIds = new Set(warnSyncIds);

  setSalesIds.forEach(storeId => {
    const quantity = warnSaleIds.filter(id => id === storeId).length;

    warnSale.push({
      quantity,
      storeId
    });
  });

  setSyncIds.forEach(storeId => {
    const quantity = warnSyncIds.filter(id => id === storeId).length;

    warnSync.push({
      quantity,
      storeId
    });
  });

  return { warnSale, warnSync };
}
