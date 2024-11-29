import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../core/models/cliente.model';
import { ClienteService } from '../../core/services/cliente.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteRepository {
  constructor(private clienteService: ClienteService) {}

  obterTodos(): Observable<Cliente[]> {
    return this.clienteService.obterTodos();
  }

  obterPorId(id: number): Observable<Cliente> {
    return this.clienteService.obterPorId(id);
  }

  criar(cnpj: string): Observable<Cliente> {
    return this.clienteService.criar(cnpj);
  }

  atualizar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.clienteService.atualizar(id, cliente);
  }

  desativar(id: number): Observable<void> {
    return this.clienteService.desativar(id);
  }

  obterComprasNoPeriodo(
    dataInicio: string,
    dataFim: string
  ): Observable<number> {
    return this.clienteService.obterComprasNoPeriodo(dataInicio, dataFim);
  }
}
