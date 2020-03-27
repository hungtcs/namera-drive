import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecycleBinRoutingModule } from './recycle-bin-routing.module';
import { ExplorerComponent } from './explorer/explorer.component';


@NgModule({
  declarations: [ExplorerComponent],
  imports: [
    CommonModule,
    RecycleBinRoutingModule
  ]
})
export class RecycleBinModule { }
