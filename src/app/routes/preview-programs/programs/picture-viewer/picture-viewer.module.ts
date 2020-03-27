import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewerComponent } from './viewer/viewer.component';
import { PictureViewerRoutingModule } from './picture-viewer-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    PictureViewerRoutingModule,
  ],
  declarations: [
    ViewerComponent,
  ],
})
export class PictureViewerModule {

}
