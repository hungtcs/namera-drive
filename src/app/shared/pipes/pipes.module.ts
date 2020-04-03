import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanReadablePipe } from './human-readable.pipe';
import { FromNowPipe } from './from-now.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FromNowPipe,
    HumanReadablePipe,
  ],
  declarations: [
    FromNowPipe,
    HumanReadablePipe,
  ],
})
export class PipesModule {

}
