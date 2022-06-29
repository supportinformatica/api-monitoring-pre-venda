import { Injectable } from '@nestjs/common';
import { CustomStoreRepository } from '@src/modules/app/store/repositories';
import { SmsService } from '@src/modules/common/services/sms-service';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly repository: CustomStoreRepository,
    private readonly smsService: SmsService
  ) {}

  public async verifyStatus() {
    return this.repository.findAll().catch(() => {
      console.log('#### sending warning message (DATABASE) ####');

      return this.smsService.sendDatabaseWarn();
    });
  }
}
