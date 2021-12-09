import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongoConnection, mongoOptions } from './config/mongo-config';
import { sqlServerConnection } from './config/mssql-config';

@Module({
  imports: [
    TypeOrmModule.forRoot(sqlServerConnection),
    MongooseModule.forRoot(mongoConnection, mongoOptions)
  ]
})
export class DatabaseModule {}
