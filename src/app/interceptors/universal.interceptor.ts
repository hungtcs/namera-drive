import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(
      @Optional() @Inject(REQUEST) protected request?: Request) {

  }

  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    let serverRequest: HttpRequest<any> = request;
    if(this.request) {
      let newUrl = `${this.request.protocol}://${this.request.get('host')}`;
      if (!request.url.startsWith('/')) {
        newUrl += '/';
      }
      newUrl += request.url;
      serverRequest = request.clone({ url: newUrl });
    }
    return next.handle(serverRequest);
  }

}
