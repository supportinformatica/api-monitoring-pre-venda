import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { Modules } from '@src/modules';

export { redisClient } from './redis';

import helmet from 'helmet';
import { TimeoutInterceptor } from '../interceptors/timeout-interceptor';

import { swaggerConfig } from './swagger';
import * as Settings from '../settings';

export async function bootstrap() {
  const app = await NestFactory.create(Modules);

  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.setGlobalPrefix('admin/:storeId');

  app.use(helmet());

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, swaggerDocument);

  return app.listen(Settings.PORT, Settings.HOST, () => {
    console.log('****************************');
    console.log(`Server running: ${Settings.HOST}:${Settings.PORT}`);
    console.log('****************************');
  });
}
