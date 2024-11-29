import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { coreProviders } from './app/core/core.providers';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Configuração das rotas
    ...coreProviders, // Registrar os provedores globais do Core
  ],
}).catch((err) => console.error(err));
