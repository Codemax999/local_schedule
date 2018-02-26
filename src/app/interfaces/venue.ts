import { Category } from './Category';

export interface Venue {
  category_list: Array<Category>;
  id: string;
  img: string;
  name: string;
  eventCount: string;
}
