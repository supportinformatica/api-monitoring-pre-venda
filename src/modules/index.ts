import { Module } from '@nestjs/common';
import { AdminModule } from './admin';
import { AppModule } from './app';
import { CommonModule } from './common';
import { DatabaseModule } from './database';

@Module({
  imports: [DatabaseModule, CommonModule, AdminModule, AppModule]
})
export class Modules {}
