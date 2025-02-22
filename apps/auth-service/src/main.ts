import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TCP_CONFIG } from '@app/common/constants';
import { ValidationPipe } from '@nestjs/common';
import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: TCP_CONFIG.AUTH.port,
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen();
  console.log(`Auth Service is running on port ${TCP_CONFIG.AUTH.port}`);
}
bootstrap();