export interface Cliente {
  id: number; // Identificador único do cliente
  razaoSocial?: string; // Nome jurídico do cliente
  nomeFantasia?: string; // Nome comercial do cliente
  cnpj?: string; // Cadastro Nacional da Pessoa Jurídica
  logradouro?: string; // Endereço do cliente
  bairro?: string; // Bairro do cliente
  cidade?: string; // Cidade do cliente
  estado?: string; // Estado do cliente
  ativo: boolean; // Indica se o cliente está ativo
}
