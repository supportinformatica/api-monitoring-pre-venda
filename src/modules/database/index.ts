import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sqlServerConnection } from './config/mssql-config';

// TODO: connect to mongo

@Module({
  imports: [TypeOrmModule.forRoot(sqlServerConnection)]
})
export class DatabaseModule {}
