import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AutguardGuard  {
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
