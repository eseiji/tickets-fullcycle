import { PartialType } from '@nestjs/mapped-types';
import { CreateSpotDto } from './create-spot.dto';
import { SpotStatus } from '@prisma/client';

export class UpdateSpotDto extends PartialType(CreateSpotDto) {
  name: string;
  status: SpotStatus;
  eventId: string;
}
