import Dates from './dates';
import { Book } from './book';
import { Chat } from './chat';
import { Club } from './club';
export interface User extends Dates {
  _id?: string;
  name: string;
  userName: string;
  birthDate: Date;
  mail: string;
  password: string;
  location: { latidude: Number; longitude: Number };
  books: Book[];
  events: Event[];
  clubs: Club[];
  chats: Chat[];
  disabled: Boolean;
  categories: string[];
}
