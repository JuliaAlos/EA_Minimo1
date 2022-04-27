import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Club, NewClub } from '../models/club';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  url = 'http://localhost:3000/club/';

  constructor(private http: HttpClient) { }

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.url);
  }

  getClub(id: string): Observable<Club> {
    return this.http.get<Club>(this.url + id);
  }

  addClub(club: NewClub): Observable<Club> {
    return this.http.post<Club>(this.url, club);
  }

  editClub(id: string, club: Club): Observable<Object> {
    return this.http.put<Object>(this.url + id, { "name": club.name, "description": club.description });
  }

  subscribe(id: string, idUser: string): Observable<Object> {
    return this.http.put<Object>(this.url, { "idUser": idUser, "idClub": id });
  }

  unsubscribe(id: string, idUser: string): Observable<Object> {
    return this.http.put<Object>(this.url + 'unsubscribe', { "idUser": idUser, "idClub": id });
  }

  deleteClub(id: string): Observable<Object> {
    return this.http.delete<Object>(this.url + id);
  }
}
