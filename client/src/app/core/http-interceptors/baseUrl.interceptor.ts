import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// case insensitive check against config and value
const startsWithAny =
  (arr: string[] = []) =>
  (value = '') => {
    return arr.some((test) =>
      value.toLowerCase().startsWith(test.toLowerCase())
    );
  };

// http, https, protocol relative
const isAbsoluteURL = startsWithAny(['http', '//']);

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      environment.apiBaseUrl &&
      !isAbsoluteURL(req.url) &&
      req.url[0] !== '/' &&
      req.url.indexOf(environment.apiBaseUrl) !== 0
    ) {
      return next.handle(
        req.clone({
          url: environment.apiBaseUrl + req.url,
        })
      );
    }

    return next.handle(req);
  }
}
