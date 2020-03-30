import { Router } from '@angular/router';
import { FileStat } from '@shared';
import { Component, Input, ComponentRef, OnDestroy, HostListener } from '@angular/core';

const mappings = [
  {
    tule: /video\/(mp4|x-matroska)/,
    route: 'video-player',
  },
  {
    tule: /image\/(jpeg|gif|png)/,
    route: 'picture-viewer',
  },
]

@Component({
  selector: 'nme-preview-wrapper',
  styleUrls: ['./preview-wrapper.component.scss'],
  templateUrl: './preview-wrapper.component.html',
})
export class PreviewWrapperComponent implements OnDestroy {
  private _file: FileStat;

  @Input()
  get file() {
    return this._file;
  }
  set file(file) {
    this._file = file;
    const b = mappings.find(a => a.tule.test(file.mimeType));
    if(b) {
      this.router.navigate([
        {
          outlets: {
            'preview-programs': ['preview-programs', b.route],
          },
        }
      ]);
    } else {
      this.router.navigate([
        {
          outlets: {
            'preview-programs': ['preview-programs', 'unknown'],
          },
        }
      ]);
    }
  }

  @Input()
  public componentRef: ComponentRef<PreviewWrapperComponent>;

  constructor(
      private readonly router: Router) {

  }

  public ngOnDestroy() {
    this.router.navigate([
      {
        outlets: {
          'preview-programs': 'preview-programs'
        },
      },
    ]);
  }

  @HostListener('window:popstate')
  public onPopstate() {
    this.componentRef.destroy();
  }

}
