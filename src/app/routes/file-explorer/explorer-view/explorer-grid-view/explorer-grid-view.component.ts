import { Component } from '@angular/core';
import { Breakpoints } from '@angular/cdk/layout';
import { ExplorerViewComponent } from '../explorer-view.component';
import { RubberbandCellDirective } from '@shared';
import { isPlatformBrowser } from '@angular/common';

const BreakpointsGridListColsMapping = {
  [Breakpoints.XSmall]: 2,
  [Breakpoints.Small]: 4,
  [Breakpoints.Medium]: 4,
  [Breakpoints.Large]: 6,
  [Breakpoints.XLarge]: 8,
};

@Component({
  selector: 'nme-explorer-grid-view',
  styleUrls: ['./explorer-grid-view.component.scss'],
  templateUrl: './explorer-grid-view.component.html',
})
export class ExplorerGridViewComponent  {

  get files() {
    return this.explorerViewComponent.files;
  }
  get folders() {
    return this.explorerViewComponent.folders;
  }
  get openFile() {
    return this.explorerViewComponent.openFile.bind(this.explorerViewComponent);;
  }
  get contextMenuPosition() {
    return this.explorerViewComponent.contextMenuPosition;
  }
  get selectedFiles() {
    return this.explorerViewComponent.selectedFiles;
  }
  set selectedFiles(selectedFiles) {
    this.explorerViewComponent.selectedFiles = selectedFiles;
  }
  get selectedFilesChange() {
    return this.explorerViewComponent.selectedFilesChange;
  }
  get onDeleteFiles() {
    return this.explorerViewComponent.onDeleteFiles.bind(this.explorerViewComponent);;
  }
  get onFileClick() {
    return this.explorerViewComponent.onFileClick.bind(this.explorerViewComponent);;
  }
  get onContextMenu() {
    return this.explorerViewComponent.onContextMenu.bind(this.explorerViewComponent);
  }

  constructor(
      private readonly explorerViewComponent: ExplorerViewComponent) {

  }

  public get gridListCols() {
    if(this.explorerViewComponent.breakpointState) {
      const breakpoint = Object.entries(this.explorerViewComponent.breakpointState.breakpoints).find(([_, matche]) => matche);
      return BreakpointsGridListColsMapping[breakpoint?.[0]] ?? 4;
    }
    return 4;
  }

  public onRubberbandSelectedCellsChange(cells: Set<RubberbandCellDirective>) {
    this.explorerViewComponent.selectedFiles = new Set(Array.from(cells).map(cell => cell.data));
    this.selectedFilesChange.emit(this.selectedFiles);
  }

}
