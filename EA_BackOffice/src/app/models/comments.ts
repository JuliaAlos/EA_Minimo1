import { User } from './user';

export interface Comment extends Date {
    _id?: string;
    user: User;
    message: string;
    edited: boolean;
    likes: number;
}
export interface NewComment {
    userID: string;
    message: string;
}