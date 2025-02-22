import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common/dto/user.dto';
import { UsersService } from './users-service.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create_user' })
  async createUser(data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @MessagePattern({ cmd: 'get_users' })
  async getUsers() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(id: number) {
    return this.usersService.findById(id);
  }
}