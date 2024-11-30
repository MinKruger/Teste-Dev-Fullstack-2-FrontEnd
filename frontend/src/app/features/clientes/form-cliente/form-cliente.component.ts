import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteRepository } from '../../../data/repositories/cliente.repository';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../../core/models/cliente.model';

@Component({
  selector: 'app-form-cliente',
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
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss'],
})
export class FormClienteComponent implements OnInit {
  clienteForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private clienteRepository: ClienteRepository
  ) {
    this.clienteForm = this.fb.group({
      cnpj: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    const clienteId = this.getClienteIdFromRoute();
    if (clienteId) {
      this.isEditMode = true;
      this.carregarCliente(clienteId);
    }
  }

  getClienteIdFromRoute(): number | null {
    const idParam = this.route.snapshot.paramMap.get('id');
    return idParam ? +idParam : null;
  }

  carregarCliente(id: number): void {
    this.clienteRepository.obterPorId(id).subscribe({
      next: (cnpj: Cliente) => {
        this.clienteForm.patchValue({
          cnpj: cnpj,
        });
      },
      error: (err) => {
        console.error('Erro ao carregar cliente:', err);
        alert('Erro ao carregar o cliente.');
      },
    });
  }

  salvar(): void {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    const cnpj: string = this.clienteForm.value.cnpj;

    if (this.isEditMode) {
      this.clienteRepository.criar(cnpj).subscribe({
        next: () => {
          alert('Cliente atualizado com sucesso!');
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error('Erro ao atualizar cliente:', err);
          alert('Erro ao atualizar o cliente.');
        },
      });
    } else {
      this.clienteRepository.criar(cnpj).subscribe({
        next: () => {
          alert('Cliente criado com sucesso!');
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error('Erro ao criar cliente:', err);
          alert('Erro ao criar o cliente.');
        },
      });
    }
  }

  resetarFormulario(): void {
    this.clienteForm.reset({
      cnpj: '',
    });
  }

  redirect() {
    this.location.back();
  }
}
