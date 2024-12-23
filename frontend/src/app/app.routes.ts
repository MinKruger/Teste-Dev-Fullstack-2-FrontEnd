import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ListVendedoresComponent } from './features/vendedores/list-vendedores/list-vendedores.component';
import { ListClientesComponent } from './features/clientes/list-clientes/list-clientes.component';
import { ListPedidosComponent } from './features/pedidos/list-pedidos/list-pedidos.component';
import { RelatoriosComponent } from './features/relatorios/relatorios.component';
import { FormPedidoComponent } from './features/pedidos/form-pedido/form-pedido.component';
import { FormClienteComponent } from './features/clientes/form-cliente/form-cliente.component';
import { FormVendedorComponent } from './features/vendedores/form-vendedor/form-vendedor.component';

export const routes: Routes = [
  // Dashboard
  { path: 'dashboard', component: DashboardComponent },

  // Clientes
  {
    path: 'clientes',
    children: [
      { path: '', component: ListClientesComponent }, // Listagem de Clientes
      // { path: 'criacao', component: FormClienteComponent },  // Substituir por componente de criação
    ],
  },

  // Vendedores
  {
    path: 'vendedores',
    children: [
      { path: '', component: ListVendedoresComponent }, // Listagem de Vendedores
      // { path: 'criacao', component: FormVendedorComponent },  // Substituir por componente de criação
    ],
  },

  // Pedidos
  {
    path: 'pedidos',
    children: [
      { path: '', component: ListPedidosComponent }, // Listagem de Pedidos
      // { path: 'criacao', component: FormPedidoComponent },  // Substituir por componente de criação
    ],
  },

  // Relatórios
  { path: 'relatorios', component: RelatoriosComponent },

  // Redirecionamento padrão
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redireciona para o Dashboard
  { path: '**', redirectTo: '/dashboard' }, // Redireciona páginas não encontradas para o Dashboard
];
