import { Type } from "class-transformer";
import { BaseEntity } from './base-entity';
import { UserProfileEntity } from "./user-profile.entity";

export class UserEntity extends BaseEntity {

  public email: string;

  public username: string;

  public password: string;

  @Type(() => UserProfileEntity)
  public profile: UserProfileEntity;

  public disabled: boolean;

  constructor(that: Partial<UserEntity> = {}) {
    super();
    Object.assign(this, that);
  }

}
