export interface Vendedor {
  id: number; // Identificador único do vendedor
  nome?: string; // Nome do vendedor
  codigoVendedor?: string; // Código do vendedor
  apelido?: string; // Apelido ou nome informal do vendedor
  ativo: boolean; // Indica se o vendedor está ativo
}
