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
