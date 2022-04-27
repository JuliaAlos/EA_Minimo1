import { User } from './user';

export interface Chat extends Date {
  _id?: string;
  name: String;
  messages: string;
  users: User[];
}

export interface NewChatBody {
  name: String;
  userIds: string[];
}
