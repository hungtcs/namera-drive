import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalInterceptor } from './interceptors/universal.interceptor';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
    },
  ],
  entryComponents: [
    AppComponent,
  ],
})
export class AppServerModule implements DoBootstrap {

  public ngDoBootstrap(applicationRef: ApplicationRef) {
    applicationRef.bootstrap(AppComponent);
  }

}
