import md5 from 'md5';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'nme-avatar',
  styleUrls: ['./avatar.component.scss'],
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
  private _email: string;

  public gravatarURL: SafeResourceUrl;

  @Input()
  public size: number = 64;

  @Input()
  public default: string;

  @Input()
  public get email() {
    return this._email;
  }
  public set email(email) {
    this._email = email;
    this.gravatarURL = this.domSanitizer.bypassSecurityTrustResourceUrl(
      `https://www.gravatar.com/avatar/${ md5(this.email) }?size=${ this.size }&default=${ encodeURIComponent(this.default) }`
    );
  }

  constructor(
      private readonly domSanitizer: DomSanitizer) {

  }

}
