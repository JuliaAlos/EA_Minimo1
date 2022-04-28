import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, NewComment } from '../models/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url = 'http://localhost:3000/comment/';

  constructor(private http: HttpClient) { }
  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url);
  }

  addComment(comment: NewComment): Observable<Comment> {
    return this.http.post<Comment>(this.url, comment);
  }

  editComment(id: string, comment: string): Observable<Object> {
    return this.http.put<Object>(this.url + id, { "message": comment });
  }
  likeComment(id: string): Observable<Object> {
    return this.http.put<Object>(this.url + 'like/' + id, {});
  }

  deleteComment(id: string): Observable<Object> {
    return this.http.delete<Object>(this.url + id);
  }
}
