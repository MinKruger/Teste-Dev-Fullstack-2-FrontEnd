// src/app/pipes/cnpj-format.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpjFormat',
  standalone: true
})
export class CnpjFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Remove todos os caracteres não numéricos
    const cnpj = value.replace(/\D/g, '');

    // Verifica se o CNPJ possui 14 dígitos
    if (cnpj.length !== 14) {
      return value; // Retorna o valor original se o formato estiver incorreto
    }

    // Aplica a formatação: 00.000.000/0000-00
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }
}
