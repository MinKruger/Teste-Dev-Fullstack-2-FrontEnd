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
    children: [
      {
        name: 'Listagem',
        url: '/clientes/listagem',
        iconComponent: { name: 'cil-list' }
      },
      {
        name: 'Criação',
        url: '/clientes/criacao',
        iconComponent: { name: 'cil-playlist-add' }
      }
    ]
  },
  {
    name: 'Vendedores',
    url: '/vendedores',
    iconComponent: { name: 'cil-people' },
    children: [
      {
        name: 'Listagem',
        url: '/vendedores/listagem',
        iconComponent: { name: 'cil-list' }
      },
      {
        name: 'Criação',
        url: '/vendedores/criacao',
        iconComponent: { name: 'cil-playlist-add' }
      }
    ]
  },
  {
    name: 'Pedidos',
    url: '/pedidos',
    iconComponent: { name: 'cil-basket' },
    children: [
      {
        name: 'Listagem',
        url: '/pedidos/listagem',
        iconComponent: { name: 'cil-list' }
      },
      {
        name: 'Criação',
        url: '/pedidos/criacao',
        iconComponent: { name: 'cil-playlist-add' }
      }
    ]
  },
  {
    name: 'Relatórios',
    url: '/relatorios',
    iconComponent: { name: 'cil-notes' },
  }
];
