import { PreviewWrapperComponent } from '../../../preview-wrapper/preview-wrapper.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'nme-video-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  public aspectRatio: number;
  public safeResourceUrl: SafeResourceUrl;

  @ViewChild('video', { read: ElementRef, static: true })
  public video: ElementRef<HTMLVideoElement>;

  constructor(
      private readonly domSanitizer: DomSanitizer,
      private readonly previewWrapperComponent: PreviewWrapperComponent,) {

  }

  public ngOnInit(): void {
    const { fullpath } = this.previewWrapperComponent.file;
    this.safeResourceUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`/api/media/video/${ Base64.encode(fullpath) }`);
  }

}
