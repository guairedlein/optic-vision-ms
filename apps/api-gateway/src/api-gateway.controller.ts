import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from '@app/common/constants';
import { CreateUserDto, LoginDto } from '@app/common/dto/user.dto';

@Controller()
export class GatewayController {
  constructor(
    @Inject(SERVICES.USERS) private readonly usersClient: ClientProxy,
    @Inject(SERVICES.AUTH) private readonly authClient: ClientProxy,
  ) {}

  // Users routes
  @Get('users')
  getAllUsers() {
    return this.usersClient.send({ cmd: 'get_users' }, {});
  }

  @Get('users/:id')
  getUserById(@Param('id') id: number) {
    return this.usersClient.send({ cmd: 'get_user_by_id' }, id);
  }

  // Auth routes
  @Post('auth/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authClient.send({ cmd: 'auth_register' }, createUserDto);
  }

  @Post('auth/login')
  login(@Body() loginDto: LoginDto) {
    return this.authClient.send({ cmd: 'auth_login' }, loginDto);
  }
}