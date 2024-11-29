import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Clientes',
    url: '/clientes',
    iconComponent: { name: 'cil-handshake' },
  },
  {
    name: 'Vendedores',
    url: '/vendedores',
    iconComponent: { name: 'cil-people' },
  },
  {
    name: 'Pedidos',
    url: '/pedidos',
    iconComponent: { name: 'cil-basket' },
  },
  {
    name: 'Relatórios',
    url: '/relatorios',
    iconComponent: { name: 'cil-notes' },
  }
];
