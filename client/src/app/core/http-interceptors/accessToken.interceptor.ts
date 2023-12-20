import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      environment.apiBaseUrl &&
      req.url.indexOf(environment.apiBaseUrl) === 0
    ) {
      return next.handle(
        req.clone({
          setHeaders: {
            authorization: 'Bearer ' + this.authenticationService.getToken(),
          },
        })
      );
    }

    return next.handle(req);
  }
}
