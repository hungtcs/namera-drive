
export class SignInEntity {
  username: string;
  password: string;

  constructor(that: Partial<SignInEntity> = {}) {
    Object.assign(this, that);
  }

}
