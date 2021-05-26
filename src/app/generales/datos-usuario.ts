import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DatosUsuario {

  usuarioId: number = parseInt(sessionStorage.getItem('usuarioId'));
  usuarioNombre: string = sessionStorage.getItem('usuarioNombre');

}
