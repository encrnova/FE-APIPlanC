import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexo'
})

export class SexoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'M': return 'HOMBRE';
      case 'H': return 'HOMBRE';
      case 'F': return 'MUJER'; 
    }
    return null;
  }

}
