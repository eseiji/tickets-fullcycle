import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from '@app/core/events/events.service';
import { Partner2CreateEventRequest } from './request/partner2.create-event.request';
import { Partner2UpdateEventRequest } from './request/partner2.update-event.request';
import { Partner2ReserveSpotRequest } from './request/partner2.reserve-spot.request';
import { AuthGuard } from '@app/core/auth/auth.guard';

@Controller('eventsP2')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventRequest: Partner2CreateEventRequest) {
    return this.eventsService.create(createEventRequest);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventRequest: Partner2UpdateEventRequest,
  ) {
    return this.eventsService.update(id, updateEventRequest);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/reserve')
  reserveSpots(
    @Param('id') eventId: string,
    @Body() reservation: Partner2ReserveSpotRequest,
  ) {
    return this.eventsService.reserveSpot(eventId, reservation);
  }
}
