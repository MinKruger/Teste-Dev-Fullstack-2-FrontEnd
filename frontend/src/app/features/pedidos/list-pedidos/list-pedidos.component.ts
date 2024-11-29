import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
} from '@coreui/angular';
import { Pedido } from '../../../core/models/pedido.model';
import { PedidoRepository } from '../../../data/repositories/pedido.repository';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-list-pedidos',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CurrencyFormatPipe,
    DateFormatPipe
  ],
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.scss'],
})
export class ListPedidosComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'descricaoPedido',
    'valorTotal',
    'dataCriacao',
    'autorizado',
    'clienteId',
    'vendedorId',
  ];
  dataSource: MatTableDataSource<Pedido> = new MatTableDataSource<Pedido>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private pedidoRepository: PedidoRepository) {}

  ngOnInit(): void {
    this.pedidoRepository.obterTodos().subscribe({
      next: (pedidos: Pedido[]) => {
        this.dataSource.data = pedidos;
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos:', err);
      },
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
