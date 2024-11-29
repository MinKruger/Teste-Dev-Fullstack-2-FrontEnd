import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly API_URL = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) {}

  obterTodos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API_URL}`);
  }

  obterPorId(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.API_URL}/${id}`);
  }

  criar(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.API_URL}`, pedido);
  }

  atualizar(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.API_URL}/${id}`, pedido);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
