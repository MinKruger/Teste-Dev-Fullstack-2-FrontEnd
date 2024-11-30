import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendedor } from '../models/vendedor.model';
import { environment } from '../../../environments/environment';
import { PedidoPorVendedor } from '../models/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class VendedorService {
  private readonly API_URL = `${environment.apiUrl}/vendedores`;

  constructor(private http: HttpClient) {}

  obterTodos(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(`${this.API_URL}`);
  }

  obterPorId(id: number): Observable<Vendedor> {
    return this.http.get<Vendedor>(`${this.API_URL}/${id}`);
  }

  criar(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post<Vendedor>(`${this.API_URL}`, vendedor);
  }

  atualizar(id: number, vendedor: Vendedor): Observable<Vendedor> {
    return this.http.put<Vendedor>(`${this.API_URL}/${id}`, vendedor);
  }

  desativar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  obterResumoVendasPorVendedor(codigoVendedor: string): Observable<PedidoPorVendedor[]> {
    return this.http.get<PedidoPorVendedor[]>(`${this.API_URL}/ObterTotalVendas/${codigoVendedor}`);
  }

  obterVendasNoPeriodo(
    dataInicio: string,
    dataFim: string
  ): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/VendasNoPeriodo`, {
      params: { dataInicio, dataFim },
    });
  }

  obterMelhorCliente(): Observable<{ clienteId: number; valorTotal: number }> {
    return this.http.get<{ clienteId: number; valorTotal: number }>(
      `${this.API_URL}/MelhorCliente`
    );
  }
}
