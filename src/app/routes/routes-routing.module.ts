import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from '../layouts/default-layout/default-layout.component';
import { AuthGuard, UserResolver } from '@shared';

const routes: Routes = [
  {
    path: 'preview-programs',
    outlet: 'preview-programs',
    loadChildren: () => import('./preview-programs/preview-programs.module').then(module => module.PreviewProgramsModule),
  },
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
      {
        path: 'recycle-bin',
        loadChildren: () => import('./recycle-bin/recycle-bin.module').then(module => module.RecycleBinModule),
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
      initialNavigation: 'disabled',
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class RoutesRoutingModule {

}
