import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from '../layouts/layouts.module';
import { RoutesRoutingModule } from './routes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    RoutesRoutingModule,
  ],
})
export class RoutesModule {

}
