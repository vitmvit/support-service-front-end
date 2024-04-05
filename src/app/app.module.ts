import {EnvironmentProviders} from '@angular/core';
import {provideRouter, RouterModule} from '@angular/router';
import {FormsModule} from "@angular/forms";

import {AppRoutingModule, routes} from './app-routing.module';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {NgbDatepickerModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

export const appModule: { imports: (BrowserModule | AppRoutingModule | HttpClientModule | RouterModule | FormsModule | NgbModule | NgbDatepickerModule | NgbPaginationModule)[]; providers: EnvironmentProviders[] } = {
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule,
    NgbPaginationModule
  ],
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
};
