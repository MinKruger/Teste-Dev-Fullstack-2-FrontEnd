import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { coreProviders } from './app/core/core.providers';
import { importProvidersFrom, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

bootstrapApplication(AppComponent, {
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideRouter(routes), // Configuração das rotas
    ...coreProviders, // Registrar os provedores globais do Core
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimationsAsync(), provideAnimationsAsync(),
    
  ],
}).catch((err) => console.error(err));
