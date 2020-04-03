import { NgModule } from '@angular/core';
import { ConfigModule } from './config/public_api';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    ConfigModule,
  ],
  exports: [
    PipesModule,
    ConfigModule,
  ],
})
export class SharedModule {

}
