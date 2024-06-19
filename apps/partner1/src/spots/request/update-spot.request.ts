import { PartialType } from '@nestjs/mapped-types';
import { CreateSpotRequest } from './create-spot.request';
import { SpotStatus } from '@prisma/client';

export class UpdateSpotRequest extends PartialType(CreateSpotRequest) {
  name: string;
  status: SpotStatus;
  eventId: string;
}
