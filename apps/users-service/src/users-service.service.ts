import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/common/dto/user.dto';

@Injectable()
export class UsersService {
  private users = [];

  async findAll() {
    return this.users;
  }

  async findById(id: number) {
    return this.users.find(user => user.id === id);
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }
}