import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  exports: [
    DefaultLayoutComponent,
  ],
  declarations: [
    DefaultLayoutComponent,
  ],
})
export class LayoutsModule {

}
