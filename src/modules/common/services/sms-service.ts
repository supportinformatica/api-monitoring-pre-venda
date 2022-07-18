import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SmsServiceDTO, SendWarn, SmsPayload } from './dtos/sms-service';

import { AUTH_KEY_SMS, DEFAULT_PHONE_NUMBER } from '@src/server/settings';
import { externalSMS } from '@src/shared/externals';

@Injectable()
export class SmsService implements SmsServiceDTO {
  constructor(private readonly http: HttpService) {}

  public sendWarnSync(payload: SendWarn[]) {
    const data: SmsPayload[] = payload.map(({ name }) => ({
      key: AUTH_KEY_SMS,
      number: DEFAULT_PHONE_NUMBER,
      type: 9,
      msg: `Sync da loja "${name}" precisa de atenção`
    }));

    externalSMS.post('send', data);
  }

  public async sendWarnSales(payload: SendWarn[]) {
    const data: SmsPayload[] = payload.map(({ name, quantity }) => {
      const message =
        quantity === 1
          ? `A loja "${name}" tem ${quantity} que precisa de atenção`
          : `A loja "${name}" tem ${quantity} que precisam de atenção`;

      return {
        key: AUTH_KEY_SMS,
        number: DEFAULT_PHONE_NUMBER,
        type: 9,
        msg: message
      };
    });

    externalSMS.post('send', data);
  }

  public async sendDatabaseWarn() {
    const data = [
      {
        key: AUTH_KEY_SMS,
        number: DEFAULT_PHONE_NUMBER,
        type: 9,
        msg: 'O banco de dados do pre-venda precisa de atenção!'
      }
    ];

    externalSMS.post('send', data);
  }
}
