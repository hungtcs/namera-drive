import { Base64 } from 'js-base64';
import { FileStat } from '@shared/entities/public_api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@shared/config/public_api';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  private get apiPrefix() {
    return this.config.get('server.api.prefix');
  }

  constructor(
      private readonly http: HttpClient,
      private readonly config: ConfigService) {

  }

  public getList(dirpath: string) {
    return this.http.get<Array<FileStat>>(`${ this.apiPrefix }/drive/list/${ Base64.encode(dirpath) }`)
      .pipe(map(data => plainToClass(FileStat, data)));
  }

  public getFileStat(filepath: string) {
    return this.http.get<FileStat>(`${ this.apiPrefix }/drive/stat/${ Base64.encode(filepath) }`)
      .pipe(map(data => plainToClass(FileStat, data)));
  }

  public createDirectory(dirpath: string) {
    return this.http.post<FileStat>(`${ this.apiPrefix }/drive/mkdir/${ Base64.encode(dirpath) }`, {})
      .pipe(map(data => plainToClass(FileStat, data)));
  }

  public downloadFile(filepath: string) {
    return this.http.get(`${ this.apiPrefix }/drive/download/${ Base64.encode(filepath) }`, { observe: 'response' });
  }

  public uploadFiles(destination: string, files: Array<File>) {
    const data = new FormData();
    files.forEach(file => data.append('file', file));
    return this.http.post(`${ this.apiPrefix }/drive/upload/${ Base64.encode(destination) }`, data, { observe: 'response' });
  }

  public deleteFile(filename: string, recursive: boolean = false) {
    return this.http.delete(`${ this.apiPrefix }/drive/delete/${ Base64.encode(filename) }`)
      .pipe(map(data => plainToClass(FileStat, data)));
  }

  public removeFile(filename: string) {
    return this.http.delete(`${ this.apiPrefix }/drive/delete/${ Base64.encode(filename) }`)
      .pipe(map(data => plainToClass(FileStat, data)));
  }

  public restoreTrash(trashId: string) {
    return this.http.put(`${ this.apiPrefix }/drive/restore/${ trashId }`, {});
  }


}
