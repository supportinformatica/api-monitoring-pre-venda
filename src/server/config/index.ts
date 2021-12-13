import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { Modules } from '@src/modules';

export { redisClient } from './redis';

import { swaggerConfig } from './swagger';
import * as Settings from '../settings';

export async function bootstrap() {
  const app = await NestFactory.create(Modules);

  app.setGlobalPrefix('admin/:storeId');

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, swaggerDocument);

  await app.listen(Settings.PORT, Settings.HOST, () => {
    console.log('***********************************');
    console.log(`Server running: http://${Settings.HOST}:${Settings.PORT}`);
    console.log('***********************************');
  });
}
