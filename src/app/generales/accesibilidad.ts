import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Accesibilidad {
  estaLogueado: string = sessionStorage.getItem('ingreso');
  login: boolean;

}
