import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PreviewWrapperComponent } from './preview-wrapper/preview-wrapper.component';
import { PreviewProgramsRoutingModule } from './preview-programs-routing.module';
import { UnknownFileViewerComponent } from './programs/unknown-file-viewer/unknown-file-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    PreviewProgramsRoutingModule,
  ],
  declarations: [
    PreviewWrapperComponent,
    UnknownFileViewerComponent
  ],
  entryComponents: [
    PreviewWrapperComponent,
  ],
})
export class PreviewProgramsModule {

}
