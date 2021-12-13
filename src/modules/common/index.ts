import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token-service';

// import * as Settings from '@src/server/settings';
import { CacheService } from './services/cache-service';

// TODO: corrigir jwt module
@Module({
  // imports: [
  //   JwtModule.register({
  //     secret: Settings.AUTH_KEY_SECURITY,
  //     signOptions: { expiresIn: Settings.AUTH_KEY_TOKEN_EXPIRES }
  //   })
  // ],
  exports: [TokenService, CacheService],
  providers: [TokenService, CacheService]
})
export class CommonModule {}
