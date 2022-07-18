import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DatabaseService } from '../services';

@Injectable()
export class DatabaseStatusJob {
  constructor(private service: DatabaseService) {}

  @Cron('00 */5 * * * *', { timeZone: 'America/Bahia' })
  public handleCron() {
    console.log(`#### VERIFY DATABASE STATUS (${new Date()}) ####`);
    this.service.verifyStatus().catch(err => console.error(err));
  }
}
