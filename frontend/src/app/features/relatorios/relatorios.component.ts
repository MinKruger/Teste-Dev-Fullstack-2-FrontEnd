import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  RowComponent,
  ColComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { Vendedor } from '../../core/models/vendedor.model';
import { RelatorioRepository } from '../../data/repositories/relatorio.repository';
import { VendedorRepository } from '../../data/repositories/vendedor.repository';
import { CnpjFormatPipe } from '../../shared/pipes/cnpj-format.pipe';
import { DateFormatDirective } from '../../shared/directives/date-format.directive';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [
    CommonModule,
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    CnpjFormatPipe,
    DateFormatDirective
  ],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
})
export class RelatoriosComponent implements OnInit {
  vendasForm: FormGroup;
  listaVendedores: Vendedor[] = [];
  totalVendas: number = 0; // Variável para armazenar o total de vendas

  melhorCliente: any;

  constructor(
    private fb: FormBuilder,
    private relatorioRepository: RelatorioRepository,
    private vendedorRepository: VendedorRepository
  ) {
    this.vendasForm = this.fb.group({
      dataInicial: ['', Validators.required],
      dataFinal: ['', Validators.required],
      vendedorId: [null],
    });
  }

  ngOnInit(): void {
    this.carregarVendedores();
  }

  carregarVendedores(): void {
    this.vendedorRepository.obterTodos().subscribe({
      next: (vendedores: Vendedor[]) => {
        this.listaVendedores = vendedores;
      },
      error: (err: any) => {
        // Adicionado tipo 'any' para 'err'
        console.error('Erro ao carregar vendedores:', err);
      },
    });
  }

  obterVendasNoPeriodo(): void {
    if (this.vendasForm.invalid) {
      this.vendasForm.markAllAsTouched();
      return;
    }

    const { dataInicial, dataFinal, vendedorId } = this.vendasForm.value;

    this.relatorioRepository
      .obterVendasNoPeriodo(dataInicial, dataFinal)
      .subscribe({
        next: (dados: number) => {
          // 'dados' é um número
          this.totalVendas = dados; // Atribui o valor recebido à variável 'totalVendas'
        },
        error: (err: any) => {
          // Adicionado tipo 'any' para 'err'
          console.error('Erro ao obter vendas no período:', err);
        },
      });
  }

  obterMelhorCliente(): void {
    this.relatorioRepository.obterMelhorCliente().subscribe({
      next: (cliente: any) => {
        this.melhorCliente = cliente;
      },
      error: (err: any) => {
        // Adicionado tipo 'any' para 'err'
        console.error('Erro ao obter melhor cliente:', err);
      },
    });
  }
}
