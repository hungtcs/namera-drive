import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'nme-breadcrumb',
  styleUrls: ['./breadcrumb.component.scss'],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {
  private _dirpath = '';

  public breadcrumbs: Array<string> = [];

  @Output()
  public breadcrumbClick: EventEmitter<string> = new EventEmitter();

  @Input()
  get dirpath() {
    return this._dirpath;
  }
  set dirpath(dirpath) {
    this._dirpath = dirpath;
    this.breadcrumbs = this.dirpath.split(/\//).filter(p => !!p);
    this.breadcrumbs.unshift('/');
  }

  constructor() {

  }

  public ngOnInit(): void {

  }

  public onBreadcrumbClick(index: number) {
    this.breadcrumbClick.emit(`/${ this.breadcrumbs.slice(1, index + 1).join('/') }`);
  }

}
