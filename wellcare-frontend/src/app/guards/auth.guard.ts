import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { adminURLs, userURLs } from '../utils/routes';
import { JwtService } from '../service/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    const token: any = this.jwt.getDecoded();

    if (token && token.role === 'Admin' && adminURLs.includes(url)) {
      return true;
    }

    if (token && token.role === 'User' && userURLs.includes(url)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}