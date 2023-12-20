import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AutguardGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isAuth()) {
      return true;
    }
    this.router.navigate(['connexion']);
    return false;
  }

  isAuth(): boolean {
    const accesstoken = sessionStorage.getItem('access_token');
    const id = sessionStorage.getItem('id');
    return accesstoken !== null && id !== null;
  }
}
