import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as Settings from '@src/server/settings';

export const mongoConnection = Settings.MONGO_URI;

export const mongoOptions: MongooseModuleOptions = {
  dbName: Settings.MONGO_NAME
};
