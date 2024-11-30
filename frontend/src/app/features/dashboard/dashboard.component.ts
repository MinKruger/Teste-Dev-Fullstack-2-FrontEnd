import { Component, OnInit } from '@angular/core';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { DashboardRepository } from '../../data/repositories/dashboard.repository';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ChartjsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // Resumo
  totalVendedores: number = 0;
  totalClientes: number = 0;
  totalPedidos: number = 0;

  // Gráficos
  vendedorClientesData: any;
  clientesAtivosInativosData: any;
  pedidosAprovadosData: any;
  relacaoClientePedidosData: any;

  constructor(private dashboardRepository: DashboardRepository) {}

  ngOnInit(): void {
    this.carregarResumo();
    this.carregarClientesAtivosInativos();
    this.carregarPedidosAprovados();
  }

  // Carregar Resumo
  carregarResumo(): void {
    this.dashboardRepository.obterTotalVendedores().subscribe({
      next: (total: number) => {
        this.totalVendedores = total;
      },
      error: (err: any) => {
        console.error('Erro ao obter total de vendedores:', err);
      },
    });

    this.dashboardRepository.obterTotalClientes().subscribe({
      next: (total: number) => {
        this.totalClientes = total;
      },
      error: (err: any) => {
        console.error('Erro ao obter total de clientes:', err);
      },
    });

    this.dashboardRepository.obterTotalPedidos().subscribe({
      next: (total: number) => {
        this.totalPedidos = total;
      },
      error: (err: any) => {
        console.error('Erro ao obter total de pedidos:', err);
      },
    });
  }

  // Gráfico: Clientes Ativos vs Inativos
  carregarClientesAtivosInativos(): void {
    this.dashboardRepository.obterClientesAtivosInativos().subscribe({
      next: (dados: { ativos: number; inativos: number }) => {
        this.clientesAtivosInativosData = {
          labels: ['Ativos', 'Inativos'],
          datasets: [
            {
              data: [dados.ativos, dados.inativos],
              backgroundColor: ['#36A2EB', '#FF6384'],
            },
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
          legend: {
            position: 'bottom',
          },
          chartType: 'pie',
        };
      },
      error: (err: any) => {
        console.error('Erro ao obter clientes ativos/inativos:', err);
      },
    });
  }

  // Gráfico: Pedidos Aprovados vs Não Aprovados
  carregarPedidosAprovados(): void {
    this.dashboardRepository.obterPedidosAprovadosNaoAprovados().subscribe({
      next: (dados: { aprovados: number; naoAprovados: number }) => {
        this.pedidosAprovadosData = {
          labels: ['Aprovados', 'Não Aprovados'],
          datasets: [
            {
              data: [dados.aprovados, dados.naoAprovados],
              backgroundColor: ['#4BC0C0', '#FFCE56'],
            },
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
          legend: {
            position: 'bottom',
          },
          chartType: 'doughnut',
        };
      },
      error: (err: any) => {
        console.error('Erro ao obter pedidos aprovados/não aprovados:', err);
      },
    });
  }
}
