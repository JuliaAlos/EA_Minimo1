import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* DESCOMENTAR DEPUES DEL MINIMO
    const role: any = localStorage.getItem('role');
    let notAuthorizet: boolean = false;
    switch (req.method) {
      case 'DELETE':
        if (!role.includes('ADMIN'))
          notAuthorizet = true;
        break;
      case 'PUT':
        if (!role.includes('ADMIN') || !role.includes('WRITER'))
          notAuthorizet = true;
        break;
      case 'POST':
        if (!role.includes('ADMIN') || !role.includes('WRITER'))
          notAuthorizet = true;
        break;
    }
    if (notAuthorizet) {
      console.log("No tienes suficientes persimos");
      return next.handle(req);
    }
    */

    const token = localStorage.getItem('token');
    const tokenHeader = req.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
    console.log(tokenHeader);
    return next.handle(tokenHeader);
  }
}
