import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat, NewChatBody } from '../models/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  url = 'http://localhost:3000/chat';

  constructor(private http: HttpClient) {}

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.url + '/');
  }

  getChat(id: string): Observable<Chat> {
    return this.http.get<Chat>(this.url + '/' + id);
  }

  newChat(chat: NewChatBody): Observable<Object> {
    return this.http.post<Object>(this.url + '/', chat);
  }

  deleteChat(chatid: string): Observable<Object> {
    return this.http.delete<Object>(this.url + '/' + chatid);
  }
}
