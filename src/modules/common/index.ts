import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { TokenService } from './services/token-service';

import * as Settings from '@src/server/settings';
import { CacheService } from './services/cache-service';
import { SmsService } from './services/sms-service';
@Module({
  imports: [
    HttpModule.register({
      baseURL: Settings.EXTERNAL_SMS_URL,
      timeout: Settings.EXTERNAL_TIMEOUT
    }),
    JwtModule.register({
      secret: Settings.AUTH_KEY_SECURITY,
      signOptions: { expiresIn: Settings.AUTH_KEY_TOKEN_EXPIRES }
    })
  ],
  exports: [TokenService, CacheService, SmsService],
  providers: [TokenService, CacheService, SmsService]
})
export class CommonModule {}
