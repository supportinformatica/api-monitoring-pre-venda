import { Module } from '@nestjs/common';

import { AuthAdminModule } from './auth';

@Module({
  imports: [AuthAdminModule]
})
export class AdminModule {}
