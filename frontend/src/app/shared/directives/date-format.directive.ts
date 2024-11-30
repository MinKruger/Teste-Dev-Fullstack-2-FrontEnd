// src/app/directives/date-format.directive.ts

import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDateFormat]',
  standalone: true,
})
export class DateFormatDirective {
  private regex: RegExp = new RegExp(/^\d{0,2}\/?\d{0,2}\/?\d{0,4}$/g);
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
  ];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Permitir teclas especiais sem restrição
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);

    // Prevenir a entrada se o próximo valor não corresponder ao regex
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let input = this.el.nativeElement.value.replace(/\D/g, '').substring(0, 8); // Limita a 8 dígitos (DDMMYYYY)
    const size = input.length;

    if (size > 4) {
      input = input.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    } else if (size > 2) {
      input = input.replace(/(\d{2})(\d{2})/, '$1/$2');
    }

    this.el.nativeElement.value = input;
  }
}
