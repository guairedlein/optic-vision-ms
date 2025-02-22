import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto, LoginDto } from '@app/common/dto/user.dto';
import { AuthService } from './auth-service.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth_register' })
  async register(data: CreateUserDto) {
    console.log('Received register request:', data);
    return this.authService.register(data);
  }

  @MessagePattern({ cmd: 'auth_login' })
  async login(data: LoginDto) {
    console.log('Received login request:', data);
    return this.authService.login(data);
  }

  @MessagePattern({ cmd: 'auth_validate_token' })
  async validateToken(data: { token: string }) {
    return this.authService.validateToken(data.token);
  }
}