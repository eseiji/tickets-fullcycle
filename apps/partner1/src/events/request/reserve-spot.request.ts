import { TicketKind } from '@prisma/client';

export class ReserveSpotRequest {
  spotsIds: string[];
  ticketKind: TicketKind;
  email: string;
}
