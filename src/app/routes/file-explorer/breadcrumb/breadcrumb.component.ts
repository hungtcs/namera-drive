import { tap } from 'rxjs/operators';
import { Component, Input, EventEmitter, Output, ElementRef, ViewChild, AfterViewInit, QueryList, ViewChildren, HostListener } from '@angular/core';
import { ExplorerViewComponent } from '../explorer-view/explorer-view.component';

@Component({
  selector: 'nme-breadcrumb',
  exportAs: 'breadcrumb',
  styleUrls: ['./breadcrumb.component.scss'],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements AfterViewInit {
  private _dirpath = '';

  public breadcrumbs: Array<string> = [];

  public hiddenBreadcrumbs: Array<string> = [];

  @Input()
  public explorerView: ExplorerViewComponent;

  @Output()
  public breadcrumbClick: EventEmitter<string> = new EventEmitter();

  @ViewChild('container', { read: ElementRef, static: true })
  public container: ElementRef<HTMLDivElement>;

  @ViewChildren('breadcrumbSections', { read: QueryList })
  public breadcrumbSections: QueryList<HTMLElement>;

  @Input()
  get dirpath() {
    return this._dirpath;
  }
  set dirpath(dirpath) {
    this._dirpath = dirpath;
    this.breadcrumbs = this.dirpath.split(/\//).filter(p => !!p);
    this.breadcrumbs.unshift('我的云端硬盘');
    this.hiddenBreadcrumbs = [];
  }

  constructor(
      private readonly elementRef: ElementRef<HTMLElement>) {

  }

  public ngAfterViewInit(): void {
    this.breadcrumbSections.changes
      // .pipe(tap(() => console.log('................changed')))
      .pipe(tap(() => this.detectionSize()))
      .subscribe();
    Promise.resolve().then(() => this.detectionSize());
  }

  @HostListener('window:resize')
  public onWindowResize() {
    this.detectionSize();
  }

  public onBreadcrumbClick(index: number) {
    const fullpaths = [this.breadcrumbs[0], ...this.hiddenBreadcrumbs, ...this.breadcrumbs.slice(1)];
    const path = `/${ fullpaths.slice(1, index + this.hiddenBreadcrumbs.length + 2).join('/') }`;
    this.breadcrumbClick.emit(path);
  }

  public onHiddenBreadcrumbClick(index: number) {
    this.breadcrumbClick.emit(`/${ this.hiddenBreadcrumbs.slice(0, index + 1).join('/') }`);
  }

  public detectionSize() {
    const hostWidth = this.elementRef.nativeElement.clientWidth;
    const wrapperWidth = this.container.nativeElement.clientWidth;
    if(wrapperWidth > hostWidth) {
      if(this.breadcrumbs.length > 2) {
        Promise.resolve().then(() => {
          const [ hiddenOne ] = this.breadcrumbs.splice(1, 1);
          this.breadcrumbs = [...this.breadcrumbs];
          this.hiddenBreadcrumbs = [...this.hiddenBreadcrumbs, hiddenOne];
        });
      }
    } else if(hostWidth - wrapperWidth > 156 && this.hiddenBreadcrumbs.length > 0) {
      Promise.resolve().then(() => {
        const lastHidden = this.hiddenBreadcrumbs.pop();
        this.breadcrumbs.splice(1, 0, lastHidden);
        this.breadcrumbs = [...this.breadcrumbs];
      });
    }
  }

}
