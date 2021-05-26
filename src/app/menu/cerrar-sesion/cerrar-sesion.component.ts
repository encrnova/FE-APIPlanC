import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})

export class CerrarSesionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CerrarSesionComponent>,
    private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    sessionStorage.removeItem('ingreso');
    sessionStorage.removeItem('usuarioId');
    sessionStorage.removeItem('usuarioNombre');

    this.router.navigate(['/iniciarSesion']);
  }

  cancelar() {
    this.dialogRef.close(null);
  }

}
