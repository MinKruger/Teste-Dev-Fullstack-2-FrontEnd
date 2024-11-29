import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { coreProviders } from './app/core/core.providers';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Configuração das rotas
    ...coreProviders, // Registrar os provedores globais do Core
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimationsAsync(), provideAnimationsAsync()
  ],
}).catch((err) => console.error(err));
