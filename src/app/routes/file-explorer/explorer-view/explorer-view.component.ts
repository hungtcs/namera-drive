import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { ExplorerViewMode } from './explorer-view-mode.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { FileType, FileStat, DriveService } from '@shared';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'nme-explorer-view',
  styleUrls: ['./explorer-view.component.scss'],
  templateUrl: './explorer-view.component.html',
})
export class ExplorerViewComponent implements OnInit {
  public FileType = FileType;
  public Breakpoints = Breakpoints;
  public ExplorerViewMode = ExplorerViewMode;

  @Input()
  public mode: ExplorerViewMode = ExplorerViewMode.GRID;

  public dirpath: string;
  public fileStats: Array<FileStat> = [];

  @Input()
  public selectedFiles: Set<FileStat> = new Set();
  @Output()
  public selectedFilesChange: EventEmitter<Set<FileStat>> = new EventEmitter();

  @ViewChild('contextMenuTrigger', { read: MatMenuTrigger })
  public contextMenuTrigger: MatMenuTrigger;
  public contextMenuPosition = { x: 0, y: 0 };

  public breakpointState: BreakpointState;

  protected readonly subscriptions: Array<Subscription> = new Array();

  public get files() {
    return this.fileStats.filter(file => file.isFile());
  }

  public get folders() {
    return this.fileStats.filter(file => file.isDirectory());
  }

  constructor(
      private readonly router: Router,
      private readonly driveService: DriveService,
      private readonly activatedRoute: ActivatedRoute,
      private readonly breakpointObserver: BreakpointObserver) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap
        .pipe(tap(paramMap => {
          this.dirpath = Base64.decode(paramMap.get('dirpath'));
        }))
        .pipe(tap(() => this.selectedFiles.clear()))
        .pipe(tap(() => this.selectedFilesChange.emit(this.selectedFiles)))
        .pipe(tap(() => this.loadFiles()))
        .subscribe(),
      this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
        .pipe(tap((state) => this.breakpointState = state))
        .subscribe(),
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onFileClick(event: MouseEvent, file: FileStat) {
    if(event.ctrlKey) {
      if(this.selectedFiles.has(file)) {
        this.selectedFiles.delete(file);
      } else {
        this.selectedFiles.add(file);
      }
      this.selectedFilesChange.emit(this.selectedFiles)
    } else {
      this.openFile(file);
    }
  }

  public openFile(file: FileStat) {
    if(file.isDirectory()) {
      this.router.navigate(['/explorer', Base64.encode(file.fullpath)])
    }
  }

  public onContextMenu(event: MouseEvent, file?: FileStat) {
    event.preventDefault();
    event.stopPropagation();
    this.contextMenuPosition.x = event.clientX;
    this.contextMenuPosition.y = event.clientY;
    this.contextMenuTrigger.menuData = { 'file': file };
    this.contextMenuTrigger.menu.focusFirstItem('mouse');
    this.contextMenuTrigger.openMenu();
  }

  private loadFiles() {
    this.driveService.getList(this.dirpath)
      .pipe(tap(files => this.fileStats = files))
      .subscribe();
  }

}
