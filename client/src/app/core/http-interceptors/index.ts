import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {BaseUrlInterceptor} from './baseUrl.interceptor';
import {AccessTokenInterceptor} from './accessToken.interceptor';
import { UnauthorizedInterceptor } from './unauthorized.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: AccessTokenInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
];
