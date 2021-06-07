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
import { Pais } from '../../modelos/pais.model';
import { AgregarComponent } from '../agregar/agregar.component';
import { CatalogoService } from 'src/app/servicios/catalogo.service';

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
  paises: string;
  codigo: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private paginacion: MatPaginatorIntl,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    private auth: Autenticacion,
    private datosUsuario: DatosUsuario,
    public catalogoService: CatalogoService,
    private pag: Paginacion) {
    this.pag.textoPaginacion();
  }

  formulario = new FormGroup({
    fechaA: new FormControl(),
    hora: new FormControl(),
    puesto: new FormControl(),
    tipo: new FormControl(),
    paises: new FormControl(),
    codigo: new FormControl()
  });

  ngOnInit(): void {
    this.catalogoService.obtenerPaises()
    .subscribe(res => { 
      this.listaPais = res;
    });
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

  agregarMovimiento(idPuesto: number, fecha: Date, idTransporte: number, procedencia: string, tipoPasajero: string) {
    this.dialog.open(AgregarComponent, {
      width: '900px',
      disableClose: true,
      data: { idPuesto: idPuesto, fecha: fecha, idTransporte: idTransporte, procedencia: procedencia, tipoPasajero: tipoPasajero }
    });
  }

  cancelar() {
    this.formulario.reset();
    this.mostrarTabla = false;
  }

}
