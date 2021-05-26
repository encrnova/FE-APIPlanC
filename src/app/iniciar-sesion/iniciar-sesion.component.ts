import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatosUsuario } from '../generales/datos-usuario';
import { Usuario } from '../modelos/usuario.model';
import { Autenticacion } from '../seguridad/autenticacion';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})

export class IniciarSesionComponent implements OnInit {

  ocultar = true;
  usuario: Usuario;
  nomUsuario: string;
  contrasena: string;
  cargando: boolean = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private usuarioService: UsuarioService,
    private datosUsuario: DatosUsuario,
    private auth: Autenticacion) {
  }

  formulario = new FormGroup({
    nomUsuario: new FormControl(),
    contrasena: new FormControl()
  });

  ngOnInit(): void {
    this.usuario = new Usuario();
  }

  async iniciarSesion() {
    this.cargando = true;
    this.usuario.USU_LOGIN = this.nomUsuario;
    this.usuario.USU_CLAVE = this.contrasena;
    
    this.usuarioService.ingresar(this.usuario)
      .subscribe(res => {
        if (res != null) {
          this.cargando = false;
          sessionStorage.setItem('usuario', 'interno');
          sessionStorage.setItem('ingreso', 'si');
          sessionStorage.setItem('usuarioId', res.USUARIO.substring(2));
          sessionStorage.setItem('usuarioNombre', res.USUARIO.substring(2));
          this.router.navigate(['/inicio']).then((result) => {
            window.location.reload();
          });
        } else {
          this.cargando = false;
          Swal.fire(
            'Error',
            'El ingreso a fallado, revise los datos e intente nuevamente o bien pongase en contacto con el administrador.',
            'error')
        }
      }, error => {
        if (error.status === 0 || error.status === 401) {
          this.cargando = false;
          this.auth.autenticacion().then(() => {
            this.iniciarSesion();
          });
        } else {
          this.cargando = false;
          Swal.fire(
            'Error',
            'El ingreso a fallado, revise los datos e intente nuevamente o bien pongase en contacto con el administrador.',
            'error')
        }
      });
  }

}
