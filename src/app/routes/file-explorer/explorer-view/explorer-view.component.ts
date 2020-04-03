import path from 'path-browserify';
import { tap, mergeMap, mapTo, catchError } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { ExplorerViewMode } from './explorer-view-mode.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { FileType, FileStat, DriveService, DialogService } from '@shared';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, Input, EventEmitter, Output, Inject, PLATFORM_ID, TemplateRef, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewProgramsService } from '../../preview-programs/preview-programs.service';
import { DOCUMENT } from '@angular/common';
import { UploadingsService, UploadTask } from 'src/app/layouts/public_api';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { CONFLICT } from 'http-status-codes';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  @ViewChild('deleteConfimDialogTemplate', { read: TemplateRef })
  public deleteConfimDialogTemplate: TemplateRef<void>;

  protected readonly subscriptions: Array<Subscription> = new Array();

  public get files() {
    return this.fileStats.filter(file => file.isFile());
  }

  public get folders() {
    return this.fileStats.filter(file => file.isDirectory());
  }

  constructor(
      protected readonly router: Router,
      protected readonly injector: Injector,
      protected readonly matDialog: MatDialog,
      protected readonly snackBar: MatSnackBar,
      protected readonly driveService: DriveService,
      protected readonly dialogService: DialogService,
      protected readonly activatedRoute: ActivatedRoute,
      protected readonly breakpointObserver: BreakpointObserver,
      protected readonly uploadingsService: UploadingsService,
      protected readonly previewProgramsService: PreviewProgramsService,
      @Inject(PLATFORM_ID) protected readonly platform: string,
      @Inject(DOCUMENT) protected readonly document: Document) {

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
    } else {
      this.previewProgramsService.showPreviewProgram(file);
      this.selectedFiles.clear();
    }
  }

  public onUploadFilesClick() {
    const input = this.document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = () => {
      const files = Array.from(input.files);
      const uploadTask = new UploadTask({
        id: 'AAAAAAAA',
        filename: `${ files.length }个文件`,
        progress: 0,
      });
      this.uploadingsService.addUploadTask(uploadTask);
      this.driveService.uploadFiles(this.dirpath, files)
        .pipe(tap(event => {
          if(event.type === HttpEventType.UploadProgress) {
            uploadTask.progress = (event.loaded / event.total) * 100;
            console.log(uploadTask.progress);
          } else if(event.type == HttpEventType.Response) {
            uploadTask.progress = 100;
            this.loadFiles();
          }
        }))
        .subscribe();
    };
    input.click();
  }

  public onContextMenu(event: MouseEvent, file?: FileStat) {
    event.preventDefault();
    event.stopPropagation();
    if(file) {
      if(!this.selectedFiles.has(file)) {
        this.selectedFiles.clear();
      }
      this.selectedFiles.add(file);
    }
    this.contextMenuPosition.x = event.clientX;
    this.contextMenuPosition.y = event.clientY;
    this.contextMenuTrigger.menuData = { 'file': file };
    this.contextMenuTrigger.menu.focusFirstItem('mouse');
    this.contextMenuTrigger.openMenu();
  }

  public onDeleteFiles() {
    this.dialogService.confirm({
      data: {
        title: '是否永久删除',
        description: `您正在删除${ this.selectedFiles.size }个文件或文件夹, <b>请注意这是不能恢复的！</b>`
      },
      onConfirm: () => {
        const filepaths = Array.from(this.selectedFiles).map(file => file.fullpath);
        return this.driveService.deleteFiles(filepaths)
          .pipe(tap(() => this.loadFiles()))
          .pipe(mapTo(true));
      },
    })
  }

  public onRemoveFiles() {
    const filepaths = Array.from(this.selectedFiles).map(file => file.fullpath);
    this.driveService.removeFiles(filepaths)
      .pipe(tap(() => this.loadFiles()))
      .subscribe();
  }

  public onRenameFile(file: FileStat) {
    this.dialogService.prompt({
      data: {
        title: '重命名',
        value: file.name,
        required: true,
      },
      onConfirm: (value) => {
        if(value === file.name) {
          return true;
        }
        return this.driveService.moveFile(file.fullpath, path.join(path.dirname(file.fullpath), value))
          .pipe(tap(() => this.loadFiles()))
          .pipe(mapTo(true));
      },
    });
  }

  public onCreateFolder() {
    this.dialogService.prompt({
      data: {
        title: '新建文件夹',
        value: '',
        required: true,
      },
      onConfirm: (value) => {
        return this.driveService.createDirectory(path.join(this.dirpath, value))
          .pipe(tap(() => this.loadFiles()))
          .pipe(mapTo(true))
          .pipe(catchError(err => {
            if(err instanceof HttpErrorResponse) {
              if(err.status === CONFLICT) {
                this.snackBar.open('文件夹已存在', '关闭', {
                  duration: 2000,
                  verticalPosition: 'top',
                  horizontalPosition: 'right',
                });
                return of(false);
              }
            }
            return of(true);
          }));
      },
    });
  }

  private loadFiles() {
    this.driveService.getList(this.dirpath)
      .pipe(tap(files => this.fileStats = files))
      .subscribe();
  }

}
