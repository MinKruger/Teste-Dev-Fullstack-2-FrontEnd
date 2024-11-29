import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendedor } from '../../core/models/vendedor.model';
import { VendedorService } from '../../core/services/vendedor.service';

@Injectable({
  providedIn: 'root',
})
export class VendedorRepository {
  constructor(private vendedorService: VendedorService) {}

  obterTodos(): Observable<Vendedor[]> {
    return this.vendedorService.obterTodos();
  }

  obterPorId(id: number): Observable<Vendedor> {
    return this.vendedorService.obterPorId(id);
  }

  criar(vendedor: Vendedor): Observable<Vendedor> {
    return this.vendedorService.criar(vendedor);
  }

  atualizar(id: number, vendedor: Vendedor): Observable<Vendedor> {
    return this.vendedorService.atualizar(id, vendedor);
  }

  desativar(id: number): Observable<void> {
    return this.vendedorService.desativar(id);
  }
}
