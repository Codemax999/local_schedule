import { Place } from './place';

export interface Event {
  description: string;
  end_time: string;
  id: string;
  name: string;
  start_time: string;
  place: Place;
}
