import { SpotStatus } from '@prisma/client';

export class Partner2CreateSpotRequest {
  name: string;
  status: SpotStatus;
}
