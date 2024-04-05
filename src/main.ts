/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appModule } from './app/app.module';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appModule)
  .catch((err) => console.error(err));
