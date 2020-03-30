import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@shared/config/public_api';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private get apiPrefix() {
    return `${ this.config.get('server.api.prefix') }/media`;
  }

  constructor(
      private readonly http: HttpClient,
      private readonly config: ConfigService) {

  }



}
