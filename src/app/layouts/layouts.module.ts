import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { GravatarModule } from '@shared';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatBadgeModule,
    GravatarModule,
    MatButtonModule,
    MatRippleModule,
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
