import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { UNAUTHORIZED } from 'http-status-codes';
import { Observable, throwError, of } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
      private readonly router: Router) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.params.get('non_detect_auth')) {
      return next.handle(request);
    }
    return next.handle(request)
      .pipe(catchError(error => {
        if(error instanceof HttpErrorResponse && error.status === UNAUTHORIZED) {
          this.router.navigate(['passport/sign-in']);
          return of(null);
        } else {
          return throwError(error);
        }
      }));
  }
}
