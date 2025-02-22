import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginDto } from '@app/common/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users = []; // Temporal, deberías usar una base de datos

  constructor(private readonly jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    // Verificar si el usuario ya existe
    const existingUser = this.users.find(u => u.email === createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Crear nuevo usuario
    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
      password: hashedPassword,
      createdAt: new Date(),
    };

    this.users.push(newUser);

    // Generar token
    const token = this.jwtService.sign({ 
      sub: newUser.id, 
      email: newUser.email 
    });

    // Retornar usuario sin password y token
    const { password, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      accessToken: token,
    };
  }

  async login(loginDto: LoginDto) {
    const user = this.users.find(u => u.email === loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ 
      sub: user.id, 
      email: user.email 
    });

    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      accessToken: token,
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = this.users.find(u => u.id === payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}