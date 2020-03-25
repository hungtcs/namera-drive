import Cookie from 'js-cookie';
import JWTDecode from 'jwt-decode';
import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
      private readonly router: Router,
      @Inject(PLATFORM_ID) private readonly platformId: string,
      @Optional() @Inject(REQUEST) private readonly request?: Request,) {

  }

  public canActivate() {
    if(isPlatformBrowser(this.platformId)) {
      const token = Cookie.get('token');
      if(!token) {
        return this.router.createUrlTree(['/passport/sign-in']);
      }
      const { exp } = JWTDecode(token);
      if(exp < (Date.now() / 1000)) {
        return this.router.createUrlTree(['/passport/sign-in']);
      }
      return true;
    } else if(isPlatformServer(this.platformId)) {
      const token = this.request?.cookies?.token;
      if(!token) {
        return this.router.createUrlTree(['/passport/sign-in']);
      }
      const { exp } = JWTDecode(token);
      if(exp < (Date.now() / 1000)) {
        return this.router.createUrlTree(['/passport/sign-in']);
      }
      return true;
    }
    return true;
  }

}
