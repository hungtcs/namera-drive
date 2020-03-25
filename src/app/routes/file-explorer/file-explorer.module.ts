import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { ExplorerComponent } from './explorer/explorer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FileExplorerRoutingModule } from './file-explorer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    FileExplorerRoutingModule,
  ],
  declarations: [BreadcrumbComponent, ExplorerComponent],
})
export class FileExplorerModule {

}
