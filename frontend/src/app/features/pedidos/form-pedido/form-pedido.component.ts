import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Pedido } from '../../../core/models/pedido.model';
import { Cliente } from '../../../core/models/cliente.model';
import { PedidoRepository } from '../../../data/repositories/pedido.repository';
import {
  RowComponent,
  ColComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
} from '@coreui/angular';
import { Vendedor } from '../../../core/models/vendedor.model';
import { ClienteRepository } from '../../../data/repositories/cliente.repository';
import { VendedorRepository } from '../../../data/repositories/vendedor.repository';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-pedido',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
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
    private pedidoRepository: PedidoRepository,
    private clienteRepository: ClienteRepository,
    private VendedorRepository: VendedorRepository
  ) {
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

    // Verifica se está no modo de edição (com base no ID do pedido recebido)
    const pedidoId = this.getPedidoIdFromRoute();
    if (pedidoId) {
      this.isEditMode = true;
      this.carregarPedido(pedidoId);
    }
  }

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

  getListaVendedores(): void {
    this.VendedorRepository.obterTodos().subscribe({
      next: (vendedores: Vendedor[]) => {
        this.listaVendedores = vendedores;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
      },
    });
  }

  getPedidoIdFromRoute(): number | null {
    // Simula a lógica de extração do ID da rota
    // Em um cenário real, use o ActivatedRoute para obter o parâmetro
    return null; // Substituir com lógica de rota
  }

  carregarPedido(id: number): void {
    this.pedidoRepository.obterPorId(id).subscribe({
      next: (pedido: Pedido) => {
        this.pedidoForm.patchValue(pedido);
      },
      error: (err) => {
        console.error('Erro ao carregar pedido:', err);
      },
    });
  }

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
        },
        error: (err) => {
          console.error('Erro ao atualizar pedido:', err);
        },
      });
    } else {
      this.pedidoRepository.criar(pedido).subscribe({
        next: () => {
          alert('Pedido criado com sucesso!');
          this.pedidoForm.reset();
        },
        error: (err) => {
          console.error('Erro ao criar pedido:', err);
        },
      });
    }
  }

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
}
