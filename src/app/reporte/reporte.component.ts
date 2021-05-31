import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { CatalogoService } from 'src/app/servicios/catalogo.service';
import { Paginacion } from 'src/app/generales/paginacion';
import { Accesibilidad } from 'src/app/generales/accesibilidad';
import { Autenticacion } from 'src/app/seguridad/autenticacion';
import { Router } from '@angular/router';
import { DatosUsuario } from 'src/app/generales/datos-usuario';
import { UsuarioAuthService } from 'src/app/servicios/usuario-auth.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})

export class ReporteComponent implements OnInit {
  columnas = ['c1', 'c2', 'c3'];
  datos = new MatTableDataSource();
  contador: any;
  hayDatos: boolean = true;
  cargando: boolean = true;
  estadoCitaActiva: boolean = false;
  rangoFecha: FormGroup;
  searchForm: FormGroup;
  identificacion = '';
  sedeCita = '';
  tipoCita = '';
  estadoCita = '';
  creacion: Date;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    public acceso: Accesibilidad,
    private catalogoService: CatalogoService,
    private datosUsuario: DatosUsuario,
    private usuarioAuth: UsuarioAuthService,
    private auth: Autenticacion,
    private pag: Paginacion) {
    this.pag.textoPaginacion();
  }

  ngOnInit(): void {

  }

  // cargarTabla(solicitud: Solicitud) {
  //   this.citaProgService.obtenerPorFechaInterno(this.solicitud, this.datosUsuario.usuarioId.toString())
  //     .subscribe(res => {
  //       this.cargando = false;
  //       this.datos.data = res;
  //       this.datos.paginator = this.paginator;
  //       this.contador = res;
  //       ('cargar' + this.contador);
  //       if (this.contador.length == 0) {
  //         this.hayDatos = false;
  //       }
  //     },
  //       error => {
  //         this.cargando = false;
  //         if (error.status === 0 || error.status === 401) {
  //           this.auth.autenticacion().then(() => { this.cargarTabla(solicitud); });
  //         }
  //         else
  //           console.log('Se produjo un error mientras se intentaba recuperar citas' + error);
  //       });
  // }

}
