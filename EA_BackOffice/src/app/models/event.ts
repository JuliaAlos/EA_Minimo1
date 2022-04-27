import Dates from './dates';
import { User } from './user';

export interface Events extends Dates {
  _id?: string;
  name: string;
  description: string;
  admin: User;
  eventDate?: Date;
  usersList: User[];
  category: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
