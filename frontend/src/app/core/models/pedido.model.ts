export interface Pedido {
  id: number; // Identificador único do pedido
  descricaoPedido?: string; // Descrição do pedido
  valorTotal: number; // Valor total do pedido
  dataCriacao: Date; // Data de criação do pedido
  observacao?: string; // Observações sobre o pedido
  autorizado: boolean; // Indica se o pedido está autorizado
  clienteId: number; // Identificador do cliente associado ao pedido
  vendedorId: number; // Identificador do vendedor associado ao pedido
}

export interface PedidoDetalhado {
  descricaoPedido?: string; // Descrição do pedido
  valorTotal: number; // Valor total do pedido
  dataCriacao: Date; // Data de criação do pedido
  observacao?: string; // Observações sobre o pedido
  autorizado: boolean; // Indica se o pedido está autorizado
  nomeFantasia: string; // Nome Fantasia da Empresa
  cnpj: string; // CNPJ da empresa
  nomeVendedor: string; // Nome do Vendedor que gerou o pedido
}

export interface PedidoPorVendedor {
  descricaoPedido?: string; // Descrição do pedido
  valorTotal: number; // Valor total do pedido
  dataCriacao: Date; // Data de criação do pedido
  observacao?: string; // Observações sobre o pedido
  autorizado: boolean; // Indica se o pedido está autorizado
}
