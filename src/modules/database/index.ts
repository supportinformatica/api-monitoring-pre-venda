import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sqlServerAppConnection } from './config/mssql-app-config';
import { sqlServerAdminConnection } from './config/mssql-admin-config';

@Module({
  imports: [
    TypeOrmModule.forRoot(sqlServerAppConnection),
    TypeOrmModule.forRoot(sqlServerAdminConnection)
  ]
})
export class DatabaseModule {}
