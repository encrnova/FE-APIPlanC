import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoPasajero'
})

export class TipoPasajeroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'TRI': return 'TRIPULANTE';
      case 'PAS': return 'PASAJERO'; 
    }
    return null;
  }

}
