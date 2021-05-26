import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { DatosUsuario } from '../generales/datos-usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuNavComponent {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild('sidenav') sidenav: MatSidenav;
  esExpandido = true;
  verSubmenu1: boolean = false;
  verSubmenu2: boolean = false;
  esVisible = false;
  verSubSubMenu1: boolean = false;
  verSubSubMenu2: boolean = false;

  constructor(
    public dialog: MatDialog, 
    public router: Router,
    public datosUsuario: DatosUsuario) {}

  cerrarSesion() {
    this.dialog.open(CerrarSesionComponent, {
      width: '400px',
      disableClose: true
    });
  }

  mouseenter() {
    if (!this.esExpandido) {
      this.esVisible = true;
    }
  }

  mouseleave() {
    if (!this.esExpandido) {
      this.esVisible = false;
    }
  }
}
