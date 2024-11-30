// date-format.directive.ts
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[dateFormat]',
  standalone: true,
})
export class DateFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input')
  onInputChange() {
    let input = this.el.nativeElement.value.replace(/\D/g, '');
    if (input.length > 8) {
      input = input.substring(0, 8);
    }

    const day = input.substring(0, 2);
    const month = input.substring(2, 4);
    const year = input.substring(4, 8);

    let formattedInput = '';
    if (day) {
      formattedInput += day;
    }
    if (month) {
      formattedInput += '/' + month;
    }
    if (year) {
      formattedInput += '/' + year;
    }

    this.el.nativeElement.value = formattedInput;
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = event.key;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
