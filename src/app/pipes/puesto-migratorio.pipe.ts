import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'puestoMigratorio'
})

export class PuestoMigratorioPipe implements PipeTransform {

  transform(value: unknown, ...args: any[]): any {
    switch (value) {
      case 1: return 'Aeropuerto Juan Santa Maria';
      case 7: return 'Aeropuerto Daniel Oduver';
    }
    return null;
  }

}
