import { NgModule } from '@angular/core';
import { ConfigModule } from './config/public_api';

@NgModule({
  imports: [
    ConfigModule,
  ],
  exports: [
    ConfigModule,
  ],
})
export class SharedModule {

}
