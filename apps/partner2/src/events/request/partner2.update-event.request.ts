import { PartialType } from '@nestjs/mapped-types';
import { Partner2CreateEventRequest } from './partner2.create-event.request';

export class Partner2UpdateEventRequest extends PartialType(
  Partner2CreateEventRequest,
) {
  name: string;
  description: string;
  date: string;
  price: number;
}
