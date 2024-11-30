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
import { MatIconModule } from '@angular/material/icon';
import { Vendedor } from '../../core/models/vendedor.model';
import { RelatorioRepository } from '../../data/repositories/relatorio.repository';
import { VendedorRepository } from '../../data/repositories/vendedor.repository';
import { CnpjFormatPipe } from '../../shared/pipes/cnpj-format.pipe';
import { DateFormatDirective } from '../../shared/directives/date-format.directive';
import { PedidoPorVendedor } from '../../core/models/pedido.model';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


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
    MatIconModule,
    CurrencyFormatPipe,
    CnpjFormatPipe,
    DateFormatDirective,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
})
export class RelatoriosComponent implements OnInit {
  vendasForm: FormGroup;
  listaVendedores: Vendedor[] = [];
  dadosFiltrados: PedidoPorVendedor[] = [];
  displayedColumns: string[] = [
    'descricaoPedido',
    'valorTotal',
    'dataCriacao',
    'observacao',
    'autorizado',
  ];

  melhorCliente: any;

  constructor(
    private fb: FormBuilder,
    private relatorioRepository: RelatorioRepository,
    private vendedorRepository: VendedorRepository
  ) {
    this.vendasForm = this.fb.group({
      dataInicial: ['', Validators.required],
      dataFinal: ['', Validators.required],
      vendedorId: [null, Validators.required],
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
      .obterResumoVendasPorVendedor(vendedorId)
      .subscribe({
        next: (dados: PedidoPorVendedor[]) => {
          const dataInicialDate = new Date(dataInicial);
          const dataFinalDate = new Date(dataFinal);

          const dadosFiltrados = dados.filter((pedido) => {
            const dataCriacao = new Date(pedido.dataCriacao);
            return (
              dataCriacao >= dataInicialDate && dataCriacao <= dataFinalDate
            );
          });

          this.dadosFiltrados = dadosFiltrados;
        },
        error: (err: any) => {
          console.error('Erro ao obter resumo de vendas por vendedor:', err);
        },
      });
  }

  obterMelhorCliente(): void {
    this.relatorioRepository.obterMelhorCliente().subscribe({
      next: (cliente: any) => {
        this.melhorCliente = cliente;
      },
      error: (err: any) => {
        console.error('Erro ao obter melhor cliente:', err);
      },
    });
  }
}
