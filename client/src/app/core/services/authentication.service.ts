import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private route: Router) {}

  authenticateUrl(url: string) {
    if (url.indexOf(environment.apiBaseUrl) === 0) {
      const u = new URL(url, top?.location.href);
      const params = new URLSearchParams(u.search);
      params.delete('token');
      params.append('token', this.getToken());
      u.search = params.toString();
      return u.toString();
    }
    return url;
  }

  getToken() {
    return sessionStorage.getItem('access_token') ?? '';
  }

  doLogout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('id');
    this.route.navigate(['connexion']);
  }
}
