import { Module } from '@nestjs/common';
import { AdminModule } from './admin';
import { AppModule } from './app';
import { DatabaseModule } from './database';

@Module({
  imports: [DatabaseModule, AdminModule, AppModule]
})
export class Modules {}
