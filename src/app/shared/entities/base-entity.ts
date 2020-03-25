import { Transform } from 'class-transformer';
import { DateUtils } from '@shared/utils/date.utils';

export class BaseEntity {

  public id: number;

  @Transform(value => DateUtils.parse(value), { toClassOnly: true })
  @Transform(value => DateUtils.format(value), { toPlainOnly: true })
  public createDate: Date;

  @Transform(value => DateUtils.parse(value), { toClassOnly: true })
  @Transform(value => DateUtils.format(value), { toPlainOnly: true })
  public updateDate: Date;

}
