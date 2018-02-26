import { Location } from './location';

export interface Place {
  id: string;
  name: string;
  location?: Location;
}
