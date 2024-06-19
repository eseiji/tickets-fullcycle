import { Module } from '@nestjs/common';
import { Partner2EventsModule } from './events/partner2.events.module';
import { Partner2SpotsModule } from './spots/spots.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaCoreModule } from '@app/core';
import { AuthModule } from '@app/core/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.partner2',
      isGlobal: true,
    }),
    AuthModule,
    PrismaCoreModule,
    Partner2EventsModule,
    Partner2SpotsModule,
  ],
})
export class Partner2Module {}
