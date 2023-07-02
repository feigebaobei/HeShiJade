import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { ThemeServiceInit } from 'ng-devui/theme';

ThemeServiceInit()

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
