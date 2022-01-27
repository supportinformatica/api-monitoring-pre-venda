import { ILastUpdate, ISale } from '@src/modules/database/interfaces';
import { IS_PRODUCTION } from '@src/server/settings';
import { IdsAndQuantity } from '../../interfaces/ids-and-quantity';
import { WarnLastUpdate } from '../../interfaces/warn-last-update';

function getIds(
  nullSales: ISale[],
  lastSyncs: ILastUpdate[]
): { warnSyncIds: number[]; warnSaleIds: number[] } {
  const warnSyncIds: number[] = [];
  const warnSaleIds: number[] = [];
  const zeroOrThreeHours = IS_PRODUCTION ? 10800000 : 0;
  const now = new Date().valueOf() - zeroOrThreeHours;

  for (const nullSale of nullSales) {
    const lastSync = lastSyncs.find(({ storeId }) => storeId === nullSale.storeId);
    if (!lastSync) continue;

    const syncDate = new Date(lastSync.date);
    const saleDate = new Date(nullSale.dateSync);

    const diffSync = Math.abs(syncDate.valueOf() - now);
    const diffSale = Math.abs(syncDate.valueOf() - saleDate.valueOf());
    const minutesSaleDiff = diffSale / 1000 / 60;
    const minutesSyncDiff = diffSync / 1000 / 60;

    if (minutesSyncDiff >= 30) {
      warnSyncIds.push(lastSync.storeId);

      continue;
    }

    if (minutesSaleDiff < 10) continue;

    warnSaleIds.push(nullSale.storeId);
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
