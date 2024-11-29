import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly API_URL = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  obterTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.API_URL}`);
  }

  obterPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API_URL}/${id}`);
  }

  criar(cnpj: string): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.API_URL}`, { cnpj });
  }

  atualizar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.API_URL}/${id}`, cliente);
  }

  desativar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  obterComprasNoPeriodo(
    dataInicio: string,
    dataFim: string
  ): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/ComprasNoPeriodo`, {
      params: { dataInicio, dataFim },
    });
  }
}
