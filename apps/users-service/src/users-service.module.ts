import { Module } from '@nestjs/common';
import { UsersController } from './users-service.controller';
import { UsersService } from './users-service.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}