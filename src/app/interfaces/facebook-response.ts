import { Venue } from './venue';
import { Event } from './event';
import { Schedule } from './schedule';

export interface FacebookResponse {
  venues: Array<Venue>;
  eventPaths: Array<string>;
  allEvents: Array<Event>;
  schedule: Array<Schedule>;
}
