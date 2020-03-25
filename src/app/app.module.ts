import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RoutesModule } from './routes/routes.module';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigModule, ConfigService } from '@shared';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER, DoBootstrap, ApplicationRef } from '@angular/core';
import {  DomSanitizer, BrowserTransferStateModule, BrowserModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common'

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
    iconRegistry.addSvgIcon('notification', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/notification.svg'));
  }

  public ngDoBootstrap(applicationRef: ApplicationRef) {
    applicationRef.bootstrap(AppComponent);
  }

}
