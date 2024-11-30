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
import { Vendedor } from '../../../core/models/vendedor.model';
import { VendedorRepository } from '../../../data/repositories/vendedor.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-vendedores',
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
    MatButtonModule
  ],
  templateUrl: './list-vendedores.component.html',
  styleUrls: ['./list-vendedores.component.scss'],
})
export class ListVendedoresComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'codigoVendedor',
    'apelido',
    'ativo',
  ];
  dataSource: MatTableDataSource<Vendedor> = new MatTableDataSource<Vendedor>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private vendedorRepository: VendedorRepository,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.vendedorRepository.obterTodos().subscribe({
      next: (vendedores: Vendedor[]) => {
        this.dataSource.data = vendedores;
      },
      error: (err) => {
        console.error('Erro ao carregar vendedores:', err);
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
