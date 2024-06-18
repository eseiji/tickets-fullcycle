import { TicketKind } from '@prisma/client';

export class ReserveSpotDto {
  spotsIds: string[];
  ticketKind: TicketKind;
  email: string;
}
