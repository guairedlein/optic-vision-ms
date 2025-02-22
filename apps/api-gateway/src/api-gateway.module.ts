import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES, TCP_CONFIG } from '@app/common/constants';
import { GatewayController } from './api-gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.USERS,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: TCP_CONFIG.USERS.port,
        },
      },
      {
        name: SERVICES.AUTH,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: TCP_CONFIG.AUTH.port,
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [],
})
export class AppModule {}