import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';
import { Cliente } from '../../../core/models/cliente.model';
import { ClienteRepository } from '../../../data/repositories/cliente.repository';

@Component({
  selector: 'app-list-clientes',
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
  ],
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.scss'],
})
export class ListClientesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'razaoSocial', 'nomeFantasia', 'cnpj', 'ativo'];
  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private clienteRepository: ClienteRepository) {}

  ngOnInit(): void {
    this.clienteRepository.obterTodos().subscribe({
      next: (clientes: Cliente[]) => {
        this.dataSource.data = clientes;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
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
