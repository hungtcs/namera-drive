import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnknownFileViewerComponent } from './programs/unknown-file-viewer/unknown-file-viewer.component';

const routes: Routes = [
  {
    path: 'picture-viewer',
    loadChildren: () => import('./programs/picture-viewer/picture-viewer.module').then(module => module.PictureViewerModule),
  },
  {
    path: 'video-player',
    loadChildren: () => import('./programs/video-player/video-player.module').then(module => module.VideoPlayerModule),
  },
  {
    path: '**',
    component: UnknownFileViewerComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class PreviewProgramsRoutingModule {

}
