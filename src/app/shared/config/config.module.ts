import { ConfigService } from './config.service';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({ })
export class ConfigModule {

  public static forRoot(path: string): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_FILE_PATH',
          useValue: path,
        },
      ],
    }
  }

  public static onAppInitialize(config: ConfigService) {
    return Promise.all([
      config.loadConfig(),
    ]);
  }

}
