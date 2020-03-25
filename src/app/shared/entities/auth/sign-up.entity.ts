
export class SignUpEntity {

  public email: string;

  public username: string;

  public password: string;

  constructor(that: Partial<SignUpEntity> = {}) {
    Object.assign(this, that);
  }

}
