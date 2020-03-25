import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserEntity } from '../entities/public_api';
import { plainToClass } from 'class-transformer';
import { ConfigService } from '../config/public_api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private get apiPrefix() {
    return this.config.get('server.api.prefix');
  }

  constructor(
      private readonly http: HttpClient,
      private readonly config: ConfigService) {

  }

  public getUser() {
    return this.http.get<UserEntity>(`${ this.apiPrefix }/user`)
      .pipe(map(data => plainToClass(UserEntity, data)));
  }

}
