import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ListVendedoresComponent } from './features/vendedores/list-vendedores/list-vendedores.component';
import { ListClientesComponent } from './features/clientes/list-clientes/list-clientes.component';
import { ListPedidosComponent } from './features/pedidos/list-pedidos/list-pedidos.component';
import { RelatoriosComponent } from './features/relatorios/relatorios.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vendedores', component: ListVendedoresComponent },
  { path: 'clientes', component: ListClientesComponent },
  { path: 'pedidos', component: ListPedidosComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redireciona para o Dashboard
  { path: '**', redirectTo: '/dashboard' }, // Redireciona páginas não encontradas para o Dashboard
];
