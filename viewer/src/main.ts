import { enableProdMode } from '@angular/core';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAppMarkdown } from './app/app-markdown.provider';
import { provideAppRouter } from './app/app-routing.provider';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAppRouter(),
    provideAppMarkdown(),
  ],
}).catch((err) => console.error(err));
