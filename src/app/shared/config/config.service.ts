import { get } from 'lodash';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService<T=any> {
  private config: T;

  constructor(
      private readonly http: HttpClient,
      @Inject('CONFIG_FILE_PATH') private readonly configFilePath: string) {

  }

  public get<T=any>(key: string, defaultValue?: T): T {
    return get(this.config, key, defaultValue)
  }

  public getConfig<T>(): T {
    return this.config as unknown as T;
  }

  public loadConfig() {
    // console.log(`ConfigService::loadConfig`);
    return this.http.get<T>(this.configFilePath, { params: { non_detect_auth: 'true' } })
      .pipe(tap(data => this.config = data))
      .toPromise();
  }

}
