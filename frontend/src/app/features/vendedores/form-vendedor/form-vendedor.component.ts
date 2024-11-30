import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendedorRepository } from '../../../data/repositories/vendedor.repository';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
  selector: 'app-form-vendedor',
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
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-vendedor.component.html',
  styleUrls: ['./form-vendedor.component.scss'],
})
export class FormVendedorComponent implements OnInit {
  vendedorForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private vendedorRepository: VendedorRepository
  ) {
    this.vendedorForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      codigoVendedor: ['', Validators.required],
      apelido: [''],
      ativo: [true],
    });
  }

  ngOnInit(): void {
    const vendedorId = this.getVendedorIdFromRoute();
    if (vendedorId) {
      this.isEditMode = true;
      this.carregarVendedor(vendedorId);
    }
  }

  getVendedorIdFromRoute(): number | null {
    const idParam = this.route.snapshot.paramMap.get('id');
    return idParam ? +idParam : null;
  }

  carregarVendedor(id: number): void {
    this.vendedorRepository.obterPorId(id).subscribe({
      next: (vendedor) => {
        this.vendedorForm.patchValue({
          id: vendedor.id,
          nome: vendedor.nome,
          codigoVendedor: vendedor.codigoVendedor,
          apelido: vendedor.apelido,
          ativo: vendedor.ativo,
        });
      },
      error: (err) => {
        console.error('Erro ao carregar vendedor:', err);
        alert('Erro ao carregar o vendedor.');
      },
    });
  }

  salvar(): void {
    if (this.vendedorForm.invalid) {
      this.vendedorForm.markAllAsTouched();
      return;
    }

    const vendedor = this.vendedorForm.value;

    if (this.isEditMode) {
      this.vendedorRepository.atualizar(vendedor.id, vendedor).subscribe({
        next: () => {
          alert('Vendedor atualizado com sucesso!');
          this.router.navigate(['/vendedores']);
        },
        error: (err) => {
          console.error('Erro ao atualizar vendedor:', err);
          alert('Erro ao atualizar o vendedor.');
        },
      });
    } else {
      this.vendedorRepository.criar(vendedor).subscribe({
        next: () => {
          alert('Vendedor criado com sucesso!');
          this.router.navigate(['/vendedores']);
        },
        error: (err) => {
          console.error('Erro ao criar vendedor:', err);
          alert('Erro ao criar o vendedor.');
        },
      });
    }
  }

  resetarFormulario(): void {
    this.vendedorForm.reset({
      id: null,
      nome: '',
      codigoVendedor: '',
      apelido: '',
      ativo: true,
    });
  }

  redirect() {
    this.location.back();
  }
}
