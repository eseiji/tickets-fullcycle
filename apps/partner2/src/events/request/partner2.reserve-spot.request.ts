import { TicketKind } from '@prisma/client';

export class Partner2ReserveSpotRequest {
  spotsIds: string[];
  ticketKind: TicketKind;
  email: string;
}
