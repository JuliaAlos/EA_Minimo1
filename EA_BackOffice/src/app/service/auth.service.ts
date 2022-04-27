import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSignin, UserSignup } from '../models/auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    url = 'http://localhost:3000/auth';

    constructor(
        private http: HttpClient,
        private jwtHelperService: JwtHelperService) { }

    signin(user: UserSignin): Observable<Object> {
        return this.http.post<Object>(this.url + '/singin/', user);
    }

    signup(user: UserSignup): Observable<Object> {
        return this.http.post<Object>(this.url + '/singup/', user);
    }

    isAuth(): boolean {
        const token: any = localStorage.getItem('token');
        if (this.jwtHelperService.isTokenExpired(token) || !localStorage.getItem('token')) {
            return false;
        }
        return true;
    }

}
