import { Component } from '@angular/core';
import { Breakpoints } from '@angular/cdk/layout';
import { ExplorerViewComponent } from '../explorer-view.component';
import { RubberbandCellDirective } from '@shared';

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
export class ExplorerGridViewComponent extends ExplorerViewComponent {

  public get gridListCols() {
    if(this.breakpointState) {
      const [ key ] = Object.entries(this.breakpointState.breakpoints).find(([_, matche]) => matche);
      return BreakpointsGridListColsMapping[key] ?? 4;
    }
    return 4;
  }

  public onRubberbandSelectedCellsChange(cells: Set<RubberbandCellDirective>) {
    this.selectedFiles = new Set(Array.from(cells).map(cell => cell.data));
    this.selectedFilesChange.emit(this.selectedFiles);
  }

}
