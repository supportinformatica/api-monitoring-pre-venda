import { Module } from '@nestjs/common';

import { AuthAdminModule } from './auth';
import { LastUpdateModule } from './last_update';

@Module({
  imports: [AuthAdminModule, LastUpdateModule]
})
export class AdminModule {}
