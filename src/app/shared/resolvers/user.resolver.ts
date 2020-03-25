import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserEntity } from '../entities/public_api';
import { Observable } from 'rxjs';
import { UserService } from '../services/public_api';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<UserEntity> {

  constructor(
      private readonly userService: UserService) {

  }

  public resolve(): Observable<UserEntity> {
    return this.userService.getUser();
  }

}
