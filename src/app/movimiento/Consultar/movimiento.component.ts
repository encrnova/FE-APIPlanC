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
import { MovimientoService } from 'src/app/servicios/movimiento.service';
import { Movimiento } from 'src/app/modelos/movimiento.model';

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
  fechaMinima: Date = new Date();
  fechaMaxima: Date = new Date(this.fechaMinima.getFullYear(), this.fechaMinima.getMonth(), this.fechaMinima.getDate() + 1);
  listaPais: Pais[];
  fechaA: Date;
  hora: Time;
  puesto: string;
  tipoPas: string;
  procedencia: string;
  codigo: string;
  idTransporte: number;
  nomTransporte: string;
  desTransporte: string;
  resultado: boolean = false;
  validos: boolean = false;
  movimiento: Movimiento;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private auth: Autenticacion,
    private datosUsuario: DatosUsuario,
    public catalogoService: CatalogoService,
    public movService: MovimientoService,
    private pag: Paginacion) {
    this.pag.textoPaginacion();
  }

  formulario = new FormGroup({
    fechaA: new FormControl(),
    hora: new FormControl(),
    puesto: new FormControl(),
    tipoPas: new FormControl(),
    procedencia: new FormControl(),
    codigo: new FormControl(),
    nomTransporte: new FormControl(),
    desTransporte: new FormControl(),

  });

  ngOnInit(): void {
    this.movimiento = new Movimiento();

    this.catalogoService.obtenerPaises()
      .subscribe(res => {
        this.listaPais = res;
      });
  }

  buscarTransporte(codigo: string) {
    this.catalogoService.obtenerTransportes(codigo)
      .subscribe(res => {
        this.idTransporte = res.TRA_ID_TRANSPORTE;
        this.nomTransporte = res.EMP_NOMBRE;
        this.desTransporte = res.TRA_NOMBRE_TRANSPORTE;
        this.resultado = true;
      },
        error => {
          if (error.status === 0 || error.status === 401) {
            this.auth.autenticacion().then(() => { this.buscarTransporte(codigo); });
          }
          else
            console.log('Se produjo un error.' + error);
        });
  }

  consultar() {
    this.cargarTabla();
  }

  cargarTabla() {
    this.mostrarTabla = true;
    this.hayDatos = true;
    this.movService.obtenerPorMov(this.movimiento)
      .subscribe(res => {
        this.cargando = false;
        this.datos.data = res;
        this.datos.paginator = this.paginator;
        this.contador = res;
        if (this.contador.length == 0) {
          this.hayDatos = false;
        }
        else
          this.hayDatos = true;
      },
        error => {
          this.cargando = false;
          if (error.status === 0 || error.status === 401) {
            this.auth.autenticacion().then(() => { this.cargarTabla(); });
          }
          else
            console.log('Se produjo un error mientras se intentaba recuperar el detalle de horario.' + error);
        });
  }

  agregarMovimiento() {
    this.validos = true;
    const ventana = this.dialog.open(AgregarComponent, {
      width: '900px',
      disableClose: true,
      data: { idPuesto: this.puesto, fecha: this.fechaA, idTransporte: this.idTransporte, procedencia: this.procedencia, tipoPasajero: this.tipoPas }
    });
    ventana.afterClosed()
      .subscribe(res => {
        this.cargarTabla();
      });
  }

  cancelar() {
    this.validos = false;
    this.formulario.reset();
    this.mostrarTabla = false;
  }

}
