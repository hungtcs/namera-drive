import { NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ServerModule } from '@angular/platform-server';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalInterceptor } from './interceptors/universal.interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
    },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppServerModule {

}
