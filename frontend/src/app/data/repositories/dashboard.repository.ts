import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClienteService } from '../../core/services/cliente.service';
import { PedidoService } from '../../core/services/pedido.service';
import { VendedorService } from '../../core/services/vendedor.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardRepository {
  constructor(
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private vendedorService: VendedorService
  ) {}

  obterTotalVendedores(): Observable<number> {
    return this.vendedorService.obterTodos().pipe(map((vendedores) => vendedores.length));
  }

  obterTotalClientes(): Observable<number> {
    return this.clienteService.obterTodos().pipe(map((clientes) => clientes.length));
  }

  obterTotalPedidos(): Observable<number> {
    return this.pedidoService.obterTodos().pipe(map((pedidos) => pedidos.length));
  }

  obterClientesAtivosInativos(): Observable<{ ativos: number; inativos: number }> {
    return this.clienteService.obterTodos().pipe(
      map((clientes) => {
        const ativos = clientes.filter((cliente) => cliente.ativo).length;
        const inativos = clientes.length - ativos;
        return { ativos, inativos };
      })
    );
  }

  obterPedidosAprovadosNaoAprovados(): Observable<{ aprovados: number; naoAprovados: number }> {
    return this.pedidoService.obterTodos().pipe(
      map((pedidos) => {
        const aprovados = pedidos.filter((pedido) => pedido.autorizado).length;
        const naoAprovados = pedidos.length - aprovados;
        return { aprovados, naoAprovados };
      })
    );
  }

  obterRelacaoClientePedidos(): Observable<{ cliente: string; totalPedidos: number }[]> {
    // Placeholder: Implementar lógica para contar pedidos por cliente
    // Exemplo: Supondo que cada pedido tenha um clienteId
    return this.clienteService.obterTodos().pipe(
      map((clientes) => {
        // Obter todos os pedidos
        this.pedidoService.obterTodos().subscribe((pedidos) => {
          return clientes.map((cliente) => ({
            cliente: cliente.razaoSocial || 'Sem Nome',
            totalPedidos: pedidos.filter((pedido) => pedido.clienteId === cliente.id).length,
          }));
        });
        // Retorna um array vazio temporariamente
        return clientes.map((cliente) => ({
          cliente: cliente.razaoSocial || 'Sem Nome',
          totalPedidos: 0,
        }));
      })
    );
  }

  obterMelhorCliente(): Observable<{ nome: string; totalComprado: number }> {
    return this.vendedorService.obterMelhorCliente().pipe(
      map((melhorCliente) => ({
        nome: `Cliente ID: ${melhorCliente.clienteId}`, // Placeholder: Buscar nome do cliente pelo ID se necessário
        totalComprado: melhorCliente.valorTotal,
      }))
    );
  }
}
