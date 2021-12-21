import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LastUpdateService } from '../services';

@Injectable()
export class LastUpdateJobs {
  constructor(private lastUpdateService: LastUpdateService) {}

  @Cron('00 30 8-16 * * *')
  public handleCron() {
    this.lastUpdateService.verifyLastUpdate();
  }
}
