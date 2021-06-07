import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DatosUsuario {

  usuarioId: string = sessionStorage.getItem('usuarioId');
  usuarioNombre: string = sessionStorage.getItem('usuarioNombre');

}
