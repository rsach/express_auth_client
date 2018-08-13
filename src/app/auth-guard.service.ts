import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url: string = state.url;
    console.log(url)

    return this.checkLogin(url);
  }

  public checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    this.router.navigate(['/login']);
    return false;
  }

}
