import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RoutesModule } from './routes/routes.module';
import { MatIconRegistry } from '@angular/material/icon';
import { TransferHttpCacheModule } from '@nguniversal/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigModule, ConfigService, AuthInterceptor } from '@shared';
import { NgModule, APP_INITIALIZER, DoBootstrap, ApplicationRef } from '@angular/core';
import {  DomSanitizer, BrowserTransferStateModule, BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'namera-drive-webapp' }),
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    HttpClientModule,
    RoutesModule,
    RouterModule,
    BrowserAnimationsModule,
    ConfigModule.forRoot('/assets/config.json'),
  ],
  providers: [
    {
      deps: [ConfigService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService) => {
        return () => ConfigModule.onAppInitialize(config);
      },
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
    },
  ],
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    AppComponent,
  ],
})
export class AppModule implements DoBootstrap {

  constructor(
      readonly domSanitizer: DomSanitizer,
      readonly iconRegistry: MatIconRegistry,) {
    iconRegistry.addSvgIcon('file-move', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/file-move.svg'));
    iconRegistry.addSvgIcon('notification', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/notification.svg'));
  }

  public ngDoBootstrap(applicationRef: ApplicationRef) {
    applicationRef.bootstrap(AppComponent);
  }

}
