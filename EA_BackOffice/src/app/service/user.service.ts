import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/');
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }

  addUser(user: User): Observable<Object> {
    return this.http.post<Object>(this.url + '/', user);
  }

  editUser(id: string, user: User) {
    return this.http.put(this.url + '/update/' + id, user);
  }

  deleteUser(id: string): Observable<Object> {
    return this.http.delete<Object>(this.url + '/' + id);
  }
}
