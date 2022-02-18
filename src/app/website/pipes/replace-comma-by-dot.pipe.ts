import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[ngModel][appReplaceCommaByDot]',
})
export class ReplaceCommaByDotDirective {
  @Output() ngModelChange = new EventEmitter();

  @HostListener('input', ['$event.target.value'])
  onInputChange(value: string) {
    console.log(value);
    value = value.replace(',', '.');
    this.ngModelChange.emit(value);
  }
}
