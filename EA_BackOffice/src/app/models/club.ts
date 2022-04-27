import Dates from './dates';
import { User } from './user';
import { Chat } from './chat';
export interface Club extends Dates {
  _id?: string;
  name: string;
  description: string;
  admin: User;
  chat: Chat;
  usersList: User[];
  category: string;
}

export interface NewClub {
  clubName: string;
  description: string;
  idAdmin: string;
  category: string;
}
