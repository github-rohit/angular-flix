import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from 'src/app/user/services/user-auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(public auth: UserAuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.token}`,
      },
    });

    return next.handle(request);
  }
}
