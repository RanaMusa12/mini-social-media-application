import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = inject(AuthService);
    const token = authService.getToken();

    const authReq = token
      ? req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) })
      : req;

    return next.handle(authReq);
  }
}
