import { Base64  } from 'js-base64';
import { NgModule } from '@angular/core';
import { ExplorerComponent } from './explorer/explorer.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Base64.encode('/'),
  },
  {
    path: ':dirpath',
    component: ExplorerComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class FileExplorerRoutingModule {

}
