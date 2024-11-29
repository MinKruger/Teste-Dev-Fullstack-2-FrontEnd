import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

// Importar os serviços globais
import { ClienteService } from './services/cliente.service';
import { PedidoService } from './services/pedido.service';
import { VendedorService } from './services/vendedor.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export const coreProviders = [
  provideHttpClient(withInterceptorsFromDi()), // Registrar HttpClientModule globalmente
  ClienteService, // Serviços globais
  PedidoService,
  VendedorService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true, // Permite múltiplos interceptors
  },
];
