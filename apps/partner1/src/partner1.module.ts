import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { SpotsModule } from './spots/spots.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaCoreModule } from '@app/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.partner1',
    }),
    PrismaCoreModule,
    EventsModule,
    SpotsModule,
  ],
})
export class Partner1Module {}
