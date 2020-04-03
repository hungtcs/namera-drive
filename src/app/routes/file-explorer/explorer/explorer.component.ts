import { tap } from 'rxjs/operators';
import { FileStat } from '@shared';
import { Subscription } from 'rxjs';
import { ExplorerViewMode } from '../explorer-view/explorer-view-mode.enum';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-explorer',
  styleUrls: ['./explorer.component.scss'],
  templateUrl: './explorer.component.html',
})
export class ExplorerComponent implements OnInit, OnDestroy {
  public ExplorerViewMode = ExplorerViewMode;

  public dirpath: string;
  public selectedFiles: Set<FileStat> = new Set();

  public viewMode: ExplorerViewMode;

  @ViewChild('breadcrumb', { read: BreadcrumbComponent, static: true })
  public breadcrumb: BreadcrumbComponent;

  private readonly subscriptions: Array<Subscription> = new Array();

  constructor(
      private readonly router: Router,
      private readonly activatedRoute: ActivatedRoute,) {

  }

  public ngOnInit(): void {
    const viewMode = window.localStorage.getItem('explorer-view-mode');
    this.viewMode = viewMode ? (Number.parseInt(viewMode) ?? ExplorerViewMode.GRID) : ExplorerViewMode.GRID;
    this.subscriptions.push(
      this.activatedRoute.paramMap
        .pipe(tap(paramMap => {
          this.dirpath = Base64.decode(paramMap.get('dirpath'));
        }))
        .subscribe(),
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onBreadcrumbClick(path: string) {
    this.router.navigate(['/explorer', Base64.encode(path)])
  }

  public onToggleViewMode(mode: ExplorerViewMode) {
    this.viewMode = mode;
    window.localStorage.setItem('explorer-view-mode', `${ mode }`);
  }

  public onSelectedFilesChange(selectedFiles: Set<FileStat>) {
    this.selectedFiles = selectedFiles;
    setTimeout(() => {
      this.breadcrumb.detectionSize();
    });
  }

}
