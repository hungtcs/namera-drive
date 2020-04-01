import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { ExplorerComponent } from './explorer/explorer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FileExplorerRoutingModule } from './file-explorer-routing.module';
import { FileComponent } from './file/file.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { RubberbandModule, DialogModule } from '@shared';
import { ExplorerGridViewComponent } from './explorer-view/explorer-grid-view/explorer-grid-view.component';
import { ExplorerListViewComponent } from './explorer-view/explorer-list-view/explorer-list-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ExplorerViewComponent } from './explorer-view/explorer-view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    DialogModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    RubberbandModule,
    MatDividerModule,
    MatCheckboxModule,
    MatRippleModule,
    MatTableModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDialogModule,
    FileExplorerRoutingModule,
  ],
  declarations: [
    FileComponent,
    ExplorerComponent,
    BreadcrumbComponent,
    ExplorerGridViewComponent,
    ExplorerListViewComponent,
    ExplorerViewComponent,
  ],
})
export class FileExplorerModule {

}
