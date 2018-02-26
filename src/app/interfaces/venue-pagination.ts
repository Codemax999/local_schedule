import { Venue } from './venue';

export interface VenuePagination {
  venues: Array<Venue>;
  nextPath: string;
}
