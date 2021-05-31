import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})

export class Paginacion {

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private paginacion: MatPaginatorIntl) { }

  textoPaginacion() { 
    this.dateAdapter.setLocale('es'); // Poner fecha en español
    // Cambiar textos que muestra la paginacion a español 
    this.paginacion.itemsPerPageLabel = "Registros por página";
    this.paginacion.nextPageLabel = 'Siguiente';
    this.paginacion.previousPageLabel = 'Anterior';
    this.paginacion.firstPageLabel = "Primer Página";
    this.paginacion.lastPageLabel = "Última Página"
    this.paginacion.getRangeLabel = function (page, pageSize, length) {
      if (length === 0 || pageSize === 0) {
        return '0 de ' + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
    };
  }

}
