import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RubberbandComponent } from './rubberband.component';
import { RubberbandCellDirective } from './rubberband-cell.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    RubberbandComponent,
    RubberbandCellDirective,
  ],
  declarations: [
    RubberbandComponent,
    RubberbandCellDirective,
  ],
})
export class RubberbandModule {

}
