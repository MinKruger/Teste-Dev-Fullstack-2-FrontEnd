import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from '../../../core/models/pedido.model';
import { Cliente } from '../../../core/models/cliente.model';
import { Vendedor } from '../../../core/models/vendedor.model';
import { PedidoRepository } from '../../../data/repositories/pedido.repository';
import { ClienteRepository } from '../../../data/repositories/cliente.repository';
import { VendedorRepository } from '../../../data/repositories/vendedor.repository';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  RowComponent,
  ColComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
} from '@coreui/angular';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-pedido',
  standalone: true,
  imports: [
    CommonModule,
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-pedido.component.html',
  styleUrls: ['./form-pedido.component.scss'],
})
export class FormPedidoComponent implements OnInit {
  pedidoForm: FormGroup;
  listaClientes: Cliente[] = [];
  listaVendedores: Vendedor[] = [];
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private pedidoRepository: PedidoRepository,
    private clienteRepository: ClienteRepository,
    private vendedorRepository: VendedorRepository
  ) {
    // Inicialização do formulário reativo com validações
    this.pedidoForm = this.fb.group({
      id: [null],
      descricaoPedido: ['', [Validators.required, Validators.maxLength(200)]],
      valorTotal: [0, [Validators.required, Validators.min(0)]],
      dataCriacao: [new Date(), Validators.required],
      observacao: [''],
      autorizado: [false],
      clienteId: [null, Validators.required],
      vendedorId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getListaClientes();
    this.getListaVendedores();

    // Verifica se está no modo de edição com base no ID do pedido na rota
    const pedidoId = this.getPedidoIdFromRoute();
    if (pedidoId) {
      this.isEditMode = true;
      this.carregarPedido(pedidoId);
    }
  }

  /**
   * Obtém a lista de clientes do repositório e atualiza a variável `listaClientes`.
   */
  getListaClientes(): void {
    this.clienteRepository.obterTodos().subscribe({
      next: (clientes: Cliente[]) => {
        this.listaClientes = clientes;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
      },
    });
  }

  /**
   * Obtém a lista de vendedores do repositório e atualiza a variável `listaVendedores`.
   */
  getListaVendedores(): void {
    this.vendedorRepository.obterTodos().subscribe({
      next: (vendedores: Vendedor[]) => {
        this.listaVendedores = vendedores;
      },
      error: (err) => {
        console.error('Erro ao carregar vendedores:', err);
      },
    });
  }

  /**
   * Extrai o ID do pedido da rota atual.
   * @returns O ID do pedido ou `null` se não estiver presente.
   */
  getPedidoIdFromRoute(): number | null {
    const idParam = this.route.snapshot.paramMap.get('id');
    return idParam ? +idParam : null;
  }

  /**
   * Carrega os dados de um pedido específico e preenche o formulário para edição.
   * @param id O ID do pedido a ser carregado.
   */
  carregarPedido(id: number): void {
    this.pedidoRepository.obterPorId(id).subscribe({
      next: (pedido: Pedido) => {
        this.pedidoForm.patchValue({
          id: pedido.id,
          descricaoPedido: pedido.descricaoPedido,
          valorTotal: pedido.valorTotal,
          dataCriacao: pedido.dataCriacao,
          observacao: pedido.observacao,
          autorizado: pedido.autorizado,
          clienteId: pedido.clienteId,
          vendedorId: pedido.vendedorId,
        });
      },
      error: (err) => {
        console.error('Erro ao carregar pedido:', err);
      },
    });
  }

  /**
   * Método chamado ao submeter o formulário. Cria ou atualiza um pedido com base no modo atual.
   */
  salvar(): void {
    if (this.pedidoForm.invalid) {
      this.pedidoForm.markAllAsTouched();
      return;
    }

    const pedido: Pedido = this.pedidoForm.value;

    if (this.isEditMode) {
      this.pedidoRepository.atualizar(pedido.id, pedido).subscribe({
        next: () => {
          alert('Pedido atualizado com sucesso!');
          this.router.navigate(['/pedidos']);
        },
        error: (err) => {
          console.error('Erro ao atualizar pedido:', err);
          alert('Erro ao atualizar o pedido.');
        },
      });
    } else {
      this.pedidoRepository.criar(pedido).subscribe({
        next: () => {
          alert('Pedido criado com sucesso!');
          this.router.navigate(['/pedidos']);
        },
        error: (err) => {
          console.error('Erro ao criar pedido:', err);
          alert('Erro ao criar o pedido.');
        },
      });
    }
  }

  /**
   * Reseta o formulário para os valores iniciais.
   */
  resetarFormulario(): void {
    this.pedidoForm.reset({
      id: null,
      descricaoPedido: '',
      valorTotal: 0,
      dataCriacao: new Date(),
      observacao: '',
      autorizado: false,
      clienteId: null,
      vendedorId: null,
    });
  }

  redirect() {
    this.location.back();
  }
}
