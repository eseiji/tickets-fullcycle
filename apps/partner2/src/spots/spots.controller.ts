import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Partner2CreateSpotRequest } from './request/partner2.create-spot.request';
import { Partner2UpdateSpotRequest } from './request/partner2.update-spot.request';
import { SpotsService } from '@app/core/spots/spots.service';

@Controller('eventsP2/:eventId/spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  async create(
    @Param('eventId') eventId: string,
    @Body() createSpotRequest: Partner2CreateSpotRequest,
  ) {
    return await this.spotsService.create(eventId, createSpotRequest);
  }

  @Get()
  findAll(@Param('eventId') eventId: string) {
    return this.spotsService.findAll(eventId);
  }

  @Get(':spotId')
  findOne(@Param('eventId') eventId: string, @Param('spotId') spotId: string) {
    return this.spotsService.findOne(eventId, spotId);
  }

  @Patch(':spotId')
  update(
    @Param('eventId') eventId: string,
    @Param('spotId') spotId: string,
    @Body() updateSpotRequest: Partner2UpdateSpotRequest,
  ) {
    return this.spotsService.update(eventId, spotId, updateSpotRequest);
  }

  @Delete(':spotId')
  remove(@Param('eventId') eventId: string, @Param('spotId') spotId: string) {
    return this.spotsService.remove(eventId, spotId);
  }
}
