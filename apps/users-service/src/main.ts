import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TCP_CONFIG } from '@app/common/constants';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './users-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: TCP_CONFIG.USERS.port,
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen();
  console.log(`Users Service is running on port ${TCP_CONFIG.USERS.port}`);
}
bootstrap();