import { tap } from 'rxjs/operators';
import { FileStat } from '@shared';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ExplorerViewComponent } from '../explorer-view.component';

@Component({
  selector: 'nme-explorer-list-view',
  styleUrls: ['./explorer-list-view.component.scss'],
  templateUrl: './explorer-list-view.component.html',
})
export class ExplorerListViewComponent extends ExplorerViewComponent implements OnInit {
  public displayedColumns = ['select', 'name', 'size', 'modifyTime'];
  public selection = new SelectionModel<FileStat>(true, []);

  public ngOnInit() {
    super.ngOnInit();
    this.subscriptions.push(
      this.selection.changed
        .pipe(tap(change => this.selectedFiles = new Set(change.source.selected)))
        .pipe(tap(() => this.selectedFilesChange.emit(this.selectedFiles)))
        .subscribe(),
    );
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.fileStats.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.fileStats.forEach(row => this.selection.select(row));
  }

}
