import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from '../layouts/default-layout/default-layout.component';
import { AuthGuard, UserResolver } from '@shared';

const routes: Routes = [
  {
    path: '',
    resolve: {
      user: UserResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'explorer',
      },
      {
        path: 'explorer',
        loadChildren: () => import('./file-explorer/file-explorer.module').then(module => module.FileExplorerModule),
      },
    ],
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'passport',
    loadChildren: () => import('./passport/passport.module').then(module => module.PassportModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // initialNavigation: 'enabled',
      initialNavigation: 'disabled',
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class RoutesRoutingModule {

}
