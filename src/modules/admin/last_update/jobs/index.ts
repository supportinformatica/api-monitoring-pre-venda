import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LastUpdateService } from '../services';

@Injectable()
export class LastUpdateJobs {
  constructor(private lastUpdateService: LastUpdateService) {}

  // TODO: REMOVER

  // @Cron('00 */30 8-16 * * 1-5', { timeZone: 'America/Bahia' })
  @Cron('00 */30 8-16 * 0-10 1-5', { timeZone: 'America/Bahia' })
  public handleCron() {
    console.log(`#### VERIFY LAST UPDATE (${new Date()}) ####`);
    this.lastUpdateService.verifyLastUpdate().catch(err => console.error(err));
  }
}
