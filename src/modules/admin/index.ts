import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common';
import { Seller } from '../database/models';
import { AuthAdmin } from './middlewares/auth-admin';
import { AdminRepository } from './repositories';
import { AdminService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Seller]), CommonModule],
  exports: [AuthAdmin],
  providers: [AdminRepository, AdminService, AuthAdmin]
})
export class AdminModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthAdmin).forRoutes('*');
  }
}
