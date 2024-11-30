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
import { Pedido, PedidoDetalhado } from '../../../core/models/pedido.model';
import { PedidoRepository } from '../../../data/repositories/pedido.repository';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

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
    MatButtonModule,
    MatPaginatorModule,
    CurrencyFormatPipe,
    DateFormatPipe,
  ],
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.scss'],
})
export class ListPedidosComponent implements AfterViewInit {
  displayedColumns: string[] = [
    // 'id',
    'nomeVendedor',
    'nomeFantasia',
    'cnpj',
    'descricaoPedido',
    'valorTotal',
    'dataCriacao',
    'autorizado',
  ];
  dataSource: MatTableDataSource<PedidoDetalhado> =
    new MatTableDataSource<PedidoDetalhado>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private pedidoRepository: PedidoRepository,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pedidoRepository.obterPedidosDetalhados().subscribe({
      next: (pedidos: PedidoDetalhado[]) => {
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

  redirectToCriacao(): void {
    this.router.navigate(['criacao'], { relativeTo: this.route });
  }
}
