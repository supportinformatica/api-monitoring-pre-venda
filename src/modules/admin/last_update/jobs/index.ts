import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LastUpdateService } from '../services';

@Injectable()
export class LastUpdateJobs {
  constructor(private lastUpdateService: LastUpdateService) {}

  @Cron('00 */30 8-15 * * 1-5', { timeZone: 'America/Bahia' })
  public handleCron() {
    console.log(`#### VERIFY LAST UPDATE (${new Date()}) ####`);
    this.lastUpdateService.verifyLastUpdate().catch(err => console.error(err));
  }
}
