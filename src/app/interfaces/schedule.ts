import { Event } from './event';

export interface Schedule {
  date: number;
  events: Array<Event>;
}
