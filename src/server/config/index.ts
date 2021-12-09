import { NestFactory } from '@nestjs/core';
import { Modules } from '@src/modules';

import * as Settings from '../settings';

export async function bootstrap() {
  const app = await NestFactory.create(Modules);

  await app.listen(Settings.PORT, Settings.HOST, () => {
    console.log('***********************************');
    console.log(`Server running: http://${Settings.HOST}:${Settings.PORT}`);
    console.log('***********************************');
  });
}
