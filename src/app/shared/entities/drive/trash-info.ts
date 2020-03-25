import { FileType } from '../../enums/public_api';
import { Transform } from "class-transformer";
import { DateUtils } from '../../utils/public_api';

export class TrashInfo {

  public fileType: FileType;

  public filepath: string;

  @Transform(value => DateUtils.parse(value), { toClassOnly: true })
  @Transform(value => DateUtils.format(value), { toPlainOnly: true })
  public deleteDate: Date;

  constructor(that: Partial<TrashInfo> = {}) {
    Object.assign(this, that);
  }

  public isFile() {
    return this.fileType === FileType.FILE;
  }

  public isDirectory() {
    return this.fileType === FileType.DIRECTORY;
  }

  public isSymbolicLink() {
    return this.fileType === FileType.SYMBOLIC_LINK;
  }

}
