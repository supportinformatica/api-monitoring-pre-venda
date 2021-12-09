import { Module } from '@nestjs/common';
import { AdminModule } from './admin';
import { DatabaseModule } from './database';

@Module({
  imports: [DatabaseModule, AdminModule]
})
export class Modules {}
