import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido, PedidoDetalhado } from '../../core/models/pedido.model';
import { PedidoService } from '../../core/services/pedido.service';

@Injectable({
  providedIn: 'root',
})
export class PedidoRepository {
  constructor(private pedidoService: PedidoService) {}

  obterTodos(): Observable<Pedido[]> {
    return this.pedidoService.obterTodos();
  }

  obterPorId(id: number): Observable<Pedido> {
    return this.pedidoService.obterPorId(id);
  }

  obterPedidosDetalhados(): Observable<PedidoDetalhado[]> {
    return this.pedidoService.obterPedidosDetalhados();
  }

  criar(pedido: Pedido): Observable<Pedido> {
    return this.pedidoService.criar(pedido);
  }

  atualizar(id: number, pedido: Pedido): Observable<Pedido> {
    return this.pedidoService.atualizar(id, pedido);
  }

  excluir(id: number): Observable<void> {
    return this.pedidoService.excluir(id);
  }
}
