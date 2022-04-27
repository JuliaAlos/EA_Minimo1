import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(this.url + '/event');
  }

  deleteEvent(name: string): Observable<string> {
    return this.http.delete(this.url + '/event/' + name, {
      responseType: 'text',
    });
  }

  addEvent(event: Events, adminId: String): Observable<string> {
    return this.http.post(this.url + '/event/' + adminId, event, {
      responseType: 'text',
    });
  }

  getEvent(name: string): Observable<Events> {
    return this.http.get<Events>(this.url + '/event/' + name);
  }

  editEvent(name: string, event: Events): Observable<string> {
    return this.http.put(this.url + '/event/' + name, event, {
      responseType: 'text',
    });
  }

  joinEvent(idEvent: string, idUser: string): Observable<string> {
    return this.http.put(this.url + '/event/join/' + idUser + '/' + idEvent, null, {
      responseType: 'text',
    });
  }

  leaveEvent(idEvent: string, idUser: string): Observable<string> {
    return this.http.put(this.url + '/event/leave/' + idUser + '/' + idEvent, null, {
      responseType: 'text',
    });
  }
}
