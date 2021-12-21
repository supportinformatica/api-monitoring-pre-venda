import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleModule } from '@src/modules/app/sale';
import { StoreModule } from '@src/modules/app/store';
import { CommonModule } from '@src/modules/common';
import { MSSQL_ADMIN_NAME } from '@src/server/settings';
import { LastUpdate } from '../../database/models';
import { LastUpdateJobs } from './jobs';
import { LastUpdateRepository } from './repositories';
import { LastUpdateService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([LastUpdate], MSSQL_ADMIN_NAME),
    ScheduleModule.forRoot(),
    SaleModule,
    StoreModule,
    CommonModule
  ],
  providers: [LastUpdateRepository, LastUpdateJobs, LastUpdateService]
})
export class LastUpdateModule {}
