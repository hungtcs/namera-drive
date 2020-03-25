import { FileType } from '../../enums/public_api';

export class FileStat {

  public name: string;

  public fullpath: string;

  public size: number;

  public type: FileType;

  public mimeType: string;

  public modifyTime: Date;

  constructor(that: Partial<FileStat> = {}) {
    Object.assign(this, that);
  }

  public isFile() {
    return this.type === FileType.FILE;
  }

  public isDirectory() {
    return this.type === FileType.DIRECTORY;
  }

  public isSymbolicLink() {
    return this.type === FileType.SYMBOLIC_LINK;
  }

}
