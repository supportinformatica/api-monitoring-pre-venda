import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sqlServerAppConnection } from './config/mssql-app-config';
import { sqlServerAdminConnection } from './config/mssql-admin-config';
import { DatabaseStatusJob } from './jobs';
import { ScheduleModule } from '@nestjs/schedule';
import { Store } from './models';
import { StoreModule } from '../app/store';
import { CommonModule } from '../common';
import { DatabaseService } from './services';

@Module({
  imports: [
    TypeOrmModule.forRoot(sqlServerAppConnection),
    TypeOrmModule.forRoot(sqlServerAdminConnection),
    TypeOrmModule.forFeature([Store]),
    ScheduleModule.forRoot(),
    StoreModule,
    CommonModule
  ],
  providers: [DatabaseStatusJob, DatabaseService]
})
export class DatabaseModule {}
