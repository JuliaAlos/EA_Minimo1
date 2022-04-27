import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }
  canActivate(): boolean {
    if (!this._authService.isAuth()) {
      console.log('Token no es valido o ya expiro');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
