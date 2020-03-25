import { Type } from 'class-transformer';
import { UserEntity } from '../user.entity';

export class SignInResponseEntity {
  token: string;

  @Type(() => UserEntity)
  user: UserEntity;

  constructor(that: Partial<SignInResponseEntity> = {}) {
    Object.assign(this, that);
  }

}
