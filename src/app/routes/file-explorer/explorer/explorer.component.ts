import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DriveService, FileStat, FileType, RubberbandCellDirective } from '@shared';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ExplorerViewMode } from '../explorer-view/explorer-view-mode.enum';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

const BreakpointsGridListColsMapping = {
  [Breakpoints.XSmall]: 2,
  [Breakpoints.Small]: 4,
  [Breakpoints.Medium]: 4,
  [Breakpoints.Large]: 6,
  [Breakpoints.XLarge]: 8,
};

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit, OnDestroy {
  public ExplorerViewMode = ExplorerViewMode;

  public dirpath: string;
  public selectedFiles: Set<FileStat> = new Set();

  public viewMode: ExplorerViewMode = ExplorerViewMode.GRID;

  @ViewChild('breadcrumb', { read: BreadcrumbComponent, static: true })
  public breadcrumb: BreadcrumbComponent;

  private readonly subscriptions: Array<Subscription> = new Array();

  constructor(
      private readonly router: Router,
      private readonly activatedRoute: ActivatedRoute,) {

  }

  public ngOnInit(): void {
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

  public onSelectedFilesChange(selectedFiles: Set<FileStat>) {
    this.selectedFiles = selectedFiles;
    setTimeout(() => {
      this.breadcrumb.detectionSize();
    });
  }

}
