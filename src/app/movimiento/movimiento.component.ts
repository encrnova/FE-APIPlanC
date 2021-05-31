import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatosUsuario } from 'src/app/generales/datos-usuario';
import { Autenticacion } from 'src/app/seguridad/autenticacion';
import { MatDatepicker } from '@angular/material/datepicker';
import { Paginacion } from 'src/app/generales/paginacion';
import { Time } from '@angular/common';
import { Pais } from '../modelos/pais.model';
import { AgregarComponent } from './agregar/agregar.component';

@Component({
  selector: 'movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})

export class MovimientoComponent implements OnInit {
  columnas = ['documento', 'nacionalidad', 'fechaNac', 'nombre', 'apellido1', 'apellido2', 'sexo'];
  datos = new MatTableDataSource();
  mostrarTabla = false;
  contador: any;
  hayDatos: boolean = true;
  cargando: boolean = true;
  fechaMinima: Date;
  listaPais: Pais[];
  fechaA: Date;
  hora: Time;
  puesto: string;
  tipo: string;
  pais: string;
  codigo: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private paginacion: MatPaginatorIntl,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    private auth: Autenticacion,
    private datosUsuario: DatosUsuario,
    private pag: Paginacion) {
    this.pag.textoPaginacion();
  }

  formulario = new FormGroup({
    fechaA: new FormControl(),
    hora: new FormControl(),
    puesto: new FormControl(),
    tipo: new FormControl(),
    pais: new FormControl(),
    codigo: new FormControl()
  });

  ngOnInit(): void {
  }

  consultar() {
    this.cargarTabla();
  }

  cargarTabla() {
    this.mostrarTabla = true;
    this.cargando = false;
    this.hayDatos = true;
    // this.horarioDetalleService.detallePorHorario(this.data.id)
    //   .subscribe(res => {
    //     this.cargando = false;
    //     this.datos.data = res;
    //     this.contador = res;
    //     if (this.contador.length == 0) {
    //       this.hayDatos = false;
    //     }
    //     else
    //       this.hayDatos = true;
    //   },
    //     error => {
    //       this.cargando = false;
    //       if (error.status === 0 || error.status === 401) {
    //         this.auth.autenticacion().then(() => { this.cargarTabla(); });
    //       }
    //       else
    //         console.log('Se produjo un error mientras se intentaba recuperar el detalle de horario.' + error);
    //     });
  }

  agregarMovimiento() {
    this.dialog.open(AgregarComponent, {
      width: '900px',
      disableClose: true
    });
  }

  cancelar() {
    this.formulario.reset();
    this.mostrarTabla = false;
  }

}
