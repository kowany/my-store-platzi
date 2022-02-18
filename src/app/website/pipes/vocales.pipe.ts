import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vocales'
})
export class VocalesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
