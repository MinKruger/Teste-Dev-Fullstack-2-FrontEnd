import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendedorService } from '../../core/services/vendedor.service';
import { PedidoPorVendedor } from '../../core/models/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioRepository {
  constructor(private vendedorService: VendedorService) {}

  obterVendasNoPeriodo(
    dataInicio: string,
    dataFim: string
  ): Observable<number> {
    return this.vendedorService.obterVendasNoPeriodo(dataInicio, dataFim);
  }

  obterMelhorCliente(): Observable<{ clienteId: number; valorTotal: number }> {
    return this.vendedorService.obterMelhorCliente();
  }

  obterResumoVendasPorVendedor(codigoVendedor: string): Observable<PedidoPorVendedor[]> {
    return this.vendedorService.obterResumoVendasPorVendedor(codigoVendedor);
  }
}
