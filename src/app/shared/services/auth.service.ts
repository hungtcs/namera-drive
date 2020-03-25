import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/public_api';
import { SignInEntity, SignInResponseEntity } from '../entities/public_api';
import { classToPlain, plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private get apiPrefix() {
    return this.config.get('server.api.prefix');
  }

  constructor(
      private readonly http: HttpClient,
      private readonly config: ConfigService) {

  }

  public signIn(signIn: SignInEntity) {
    return this.http.post(`${ this.apiPrefix }/auth/sign-in`, classToPlain(signIn), { params: { non_detect_auth: 'true' } })
      .pipe(map(data => plainToClass(SignInResponseEntity, data)));
  }

}
