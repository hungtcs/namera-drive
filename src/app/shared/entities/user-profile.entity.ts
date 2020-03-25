import { Gender } from '../enums/public_api';
import { DateUtils } from '../utils/public_api';
import { Transform } from "class-transformer";
import { UserEntity } from "./user.entity";
import { BaseEntity } from './base-entity';

export class UserProfileEntity extends BaseEntity {

  public firstName: string;

  public lastName: string;

  @Transform(value => DateUtils.parse(value), { toClassOnly: true })
  @Transform(value => DateUtils.format(value), { toPlainOnly: true })
  public birthday: Date;

  public gender: Gender;

  public avatar: string;

  public phoneNumber: string;

  public user: UserEntity;

  constructor(that: Partial<UserProfileEntity> = {}) {
    super();
    Object.assign(this, that);
  }

}
