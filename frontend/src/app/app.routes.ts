import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ListVendedoresComponent } from './features/vendedores/list-vendedores/list-vendedores.component';
import { ListClientesComponent } from './features/clientes/list-clientes/list-clientes.component';
import { ListPedidosComponent } from './features/pedidos/list-pedidos/list-pedidos.component';
import { RelatoriosComponent } from './features/relatorios/relatorios.component';

export const routes: Routes = [
  // Dashboard
  { path: 'dashboard', component: DashboardComponent },

  // Clientes
  {
    path: 'clientes',
    children: [
      { path: 'listagem', component: ListClientesComponent }, // Listagem de Clientes
      { path: 'criacao', component: ListClientesComponent },  // Substituir por componente de criação
    ],
  },

  // Vendedores
  {
    path: 'vendedores',
    children: [
      { path: 'listagem', component: ListVendedoresComponent }, // Listagem de Vendedores
      { path: 'criacao', component: ListVendedoresComponent },  // Substituir por componente de criação
    ],
  },

  // Pedidos
  {
    path: 'pedidos',
    children: [
      { path: 'listagem', component: ListPedidosComponent }, // Listagem de Pedidos
      { path: 'criacao', component: ListPedidosComponent },  // Substituir por componente de criação
    ],
  },

  // Relatórios
  { path: 'relatorios', component: RelatoriosComponent },

  // Redirecionamento padrão
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redireciona para o Dashboard
  { path: '**', redirectTo: '/dashboard' }, // Redireciona páginas não encontradas para o Dashboard
];
