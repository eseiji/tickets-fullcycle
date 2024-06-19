import { PartialType } from '@nestjs/mapped-types';
import { Partner2CreateSpotRequest } from './partner2.create-spot.request';
import { SpotStatus } from '@prisma/client';

export class Partner2UpdateSpotRequest extends PartialType(
  Partner2CreateSpotRequest,
) {
  name: string;
  status: SpotStatus;
  eventId: string;
}
