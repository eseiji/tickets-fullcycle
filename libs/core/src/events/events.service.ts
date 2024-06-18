import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ReserveSpotDto } from './dto/reserve-spot.dto';
import { Prisma, TicketStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.prismaService.event.create({
      data: {
        ...createEventDto,
        date: new Date(),
      },
    });
  }

  findAll() {
    return this.prismaService.event.findMany();
  }

  findOne(id: string) {
    return this.prismaService.event.findUnique({
      where: { id },
    });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.prismaService.event.update({
      data: updateEventDto,
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.event.delete({
      where: {
        id,
      },
    });
  }

  async reserveSpot(eventId: string, reservation: ReserveSpotDto) {
    const isSpotsValid = await this.prismaService.spot.findMany({
      where: {
        eventId,
        id: {
          in: reservation.spotsIds,
        },
      },
    });

    if (isSpotsValid.length !== reservation.spotsIds.length) {
      throw new Error('Invalid spots');
    }

    try {
      await this.prismaService.$transaction(
        async (prisma) => {
          await prisma.reservationHistory.createMany({
            data: reservation.spotsIds.map((spotId) => ({
              spotId,
              email: reservation.email,
              status: TicketStatus.reserved,
              ticketKind: reservation.ticketKind,
            })),
          });

          await prisma.spot.updateMany({
            data: {
              status: TicketStatus.reserved,
            },
            where: {
              id: {
                in: reservation.spotsIds,
              },
            },
          });

          const createdTickets = await Promise.all(
            reservation.spotsIds.map((spotId) => {
              prisma.ticket.create({
                data: {
                  spotId,
                  email: reservation.email,
                  ticketKind: reservation.ticketKind,
                },
              });
            }),
          );

          return createdTickets;
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
        },
      );
    } catch (error) {
      // exception filter - nest
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new Error('Spot already reserved'); // unique constraint violation
          case 'P2034':
            throw new Error('Reservation error, try again'); // transaction conflict
          default:
            throw error;
        }
      }
    }

    // await this.prismaService.ticket.createMany({
    //   data: reservation.spotsIds.map((spotId) => ({
    //     spotId,
    //     email: reservation.email,
    //     ticketKind: reservation.ticketKind,
    //   })),
    // });
  }
}
