import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIn } from '@src/modules/database/models';
import { CustomCheckInRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([CheckIn])],
  exports: [CustomCheckInRepository],
  providers: [CustomCheckInRepository]
})
export class CheckInModule {}
