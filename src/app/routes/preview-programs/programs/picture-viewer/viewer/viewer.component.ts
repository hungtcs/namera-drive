import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2, HostListener, HostBinding, Inject } from '@angular/core';
import { PreviewWrapperComponent } from '../../../preview-wrapper/preview-wrapper.component';
import { DriveService } from '@shared';
import { tap } from 'rxjs/operators';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'nme-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnDestroy {
  private imageObjectURL: string;
  private imageScale: number = 1;
  private imageTranslateX: number =  0;
  private imageTranslateY: number =  0;
  private lastMousePoint: { x: number, y: number };

  public imageSafeResourceUrl: SafeResourceUrl;

  @ViewChild('image', { read: ElementRef })
  public image: ElementRef<HTMLDivElement>;

  @HostBinding('class.picture-moving')
  public get moving() {
    return !!this.lastMousePoint;
  }

  private get file() {
    return this.previewWrapperComponent.file;
  }

  constructor(
      private readonly renderer: Renderer2,
      private readonly driveService: DriveService,
      private readonly domSanitizer: DomSanitizer,
      private readonly previewWrapperComponent: PreviewWrapperComponent,
      @Inject(DOCUMENT) private readonly document: Document,) {

  }

  public ngOnInit(): void {
    this.driveService.downloadFile(this.file.fullpath)
      .pipe(tap(event => {
        if(event.type === HttpEventType.DownloadProgress) {
        } else if(event instanceof HttpResponse) {
          this.imageObjectURL = URL.createObjectURL(event.body);
          this.imageSafeResourceUrl = this.domSanitizer.bypassSecurityTrustStyle(`url(${ this.imageObjectURL })`);
        }
      }))
      .subscribe();
  }

  public ngOnDestroy() {
    if(this.imageObjectURL) {
      URL.revokeObjectURL(this.imageObjectURL);
    }
  }

  public onMouseWheel(event: WheelEvent) {
    const { deltaY } = event;
    this.imageScale -= deltaY/530;
    this.imageScale = this.imageScale < 0.256 ? 0.256 : this.imageScale;
    this.imageScale = this.imageScale > 5 ? 5 : this.imageScale;
    this.renderer.setStyle(
      this.image.nativeElement,
      'transform',
      `translate(${ this.imageTranslateX }px, ${ this.imageTranslateY }px) scale(${ this.imageScale })`,
    );
  }

  public onMouseDown(event: MouseEvent) {
    this.lastMousePoint = {
      x: event.x,
      y: event.y,
    };
    this.document.body.classList.add('nme-picture-viewer--moving');
  }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    if(this.lastMousePoint) {
      const { x, y } = event;
      this.imageTranslateX += x - this.lastMousePoint.x;
      this.imageTranslateY += y - this.lastMousePoint.y;
      this.lastMousePoint = { x, y };
      this.renderer.setStyle(
        this.image.nativeElement,
        'transform',
        `translate(${ this.imageTranslateX }px, ${ this.imageTranslateY }px) scale(${ this.imageScale })`,
      );
    }
  }

  @HostListener('document:mouseup', ['$event'])
  public onMouseUp(event: MouseEvent) {
    if(this.lastMousePoint) {
      this.lastMousePoint = null;
      this.document.body.classList.remove('nme-picture-viewer--moving');
    }
  }

}
