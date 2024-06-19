import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}

  async create(eventId: string, createSpotDto: CreateSpotDto) {
    const isEventValid = await this.prismaService.event.findFirst({
      where: { id: eventId },
    });

    if (!!isEventValid) {
      return this.prismaService.spot.create({
        data: {
          ...createSpotDto,
          eventId,
        },
      });
    } else {
      return 'Event not found';
    }
  }

  findAll(eventId: string) {
    return this.prismaService.spot.findMany({
      where: { eventId },
    });
  }

  findOne(eventId: string, spotId: string) {
    return this.prismaService.spot.findUnique({
      where: { id: spotId, eventId },
    });
  }

  update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    return this.prismaService.spot.update({
      data: updateSpotDto,
      where: { id: spotId, eventId },
    });
  }

  remove(eventId: string, spotId: string) {
    return this.prismaService.spot.delete({
      where: { id: spotId, eventId },
    });
  }
}
