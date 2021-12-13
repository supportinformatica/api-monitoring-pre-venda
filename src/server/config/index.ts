import { NestFactory } from '@nestjs/core';
import { Modules } from '@src/modules';
export { redisClient } from './redis';

import * as Settings from '../settings';

export async function bootstrap() {
  const app = await NestFactory.create(Modules);

  app.setGlobalPrefix('admin/:storeId');

  await app.listen(Settings.PORT, Settings.HOST, () => {
    console.log('***********************************');
    console.log(`Server running: http://${Settings.HOST}:${Settings.PORT}`);
    console.log('***********************************');
  });
}
