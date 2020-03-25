import { Component, OnInit } from '@angular/core';
import { DriveService, FileStat } from '@shared';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {
  public files: Array<FileStat> = [];
  public dirpath: string;

  constructor(
      private readonly router: Router,
      private readonly driveService: DriveService,
      private readonly activatedRoute: ActivatedRoute) {

  }

  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(tap(paramMap => {
        this.dirpath = Base64.decode(paramMap.get('dirpath'));
      }))
      .pipe(tap(() => this.loadFiles()))
      .subscribe()
  }

  public onFileClick(file: FileStat) {
    if(file.isDirectory()) {
      this.router.navigate(['/explorer', Base64.encode(file.fullpath)])
    }
  }

  public onBreadcrumbClick(path: string) {
    this.router.navigate(['/explorer', Base64.encode(path)])
  }

  private loadFiles() {
    this.driveService.getList(this.dirpath)
      .pipe(tap(files => this.files = files))
      .subscribe();
  }

}
