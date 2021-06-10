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
import { DatePipe, Time } from '@angular/common';
import { Pais } from '../../modelos/pais.model';
import { AgregarComponent } from '../agregar/agregar.component';
import { CatalogoService } from 'src/app/servicios/catalogo.service';
import { MovimientoService } from 'src/app/servicios/movimiento.service';
import { Movimiento } from 'src/app/modelos/movimiento.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css'],
  providers: [DatePipe]
})

export class MovimientoComponent implements OnInit {
  columnas = ['documento', 'nacionalidad', 'fechaNac', 'nombre', 'apellido1', 'apellido2', 'sexo', 'informacion'];
  datos = new MatTableDataSource();
  mostrarTabla = false;
  contador: any;
  hayDatos: boolean = true;
  cargando: boolean = true;
  fechaMinima: Date = new Date();
  fechaMaxima: Date = new Date(this.fechaMinima.getFullYear(), this.fechaMinima.getMonth(), this.fechaMinima.getDate() + 1);
  listaPais: Pais[];
  fechaA: Date;
  hora: string;
  puesto: number;
  tipoPas: string;
  procedencia: string;
  codigo: string;
  idTransporte: number;
  nomTransporte: string;
  desTransporte: string;
  resultado: boolean = false;
  validos: boolean = false;
  movimiento: Movimiento;
  fechaHora: string;
  camposComp: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private datePipe: DatePipe,
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

  cambioCodigo(valor: string): void {
    this.resultado = false;
    this.nomTransporte = '';
    this.desTransporte = '';
    this.camposComp = false;
  }

  verInfo() {
    Swal.fire(
      'Advertencia',
      'No se puede realizar ninguna acción sobre estos registros, en caso de requerir ayuda debería comunicarse con migración.',
      'warning')
  }

  buscarTransporte(codigo: string) {
    this.catalogoService.obtenerTransportes(codigo)
      .subscribe(res => {
        this.camposComp = true;
        this.idTransporte = res.TRA_ID_TRANSPORTE;
        this.nomTransporte = res.EMP_NOMBRE;
        this.desTransporte = res.TRA_NOMBRE_TRANSPORTE;
        this.resultado = true;
      },
        error => {
          if (error.status === 0 || error.status === 401) {
            this.camposComp = false;
            this.auth.autenticacion().then(() => { this.buscarTransporte(codigo); });
          }
          if (error.status === 404) {
            this.camposComp = false;
            Swal.fire(
              'Advertencia',
              error.error,
              'warning')
          }
          else
            console.log('Se produjo un error.' + error);
        });
  }

  consultar() {
    this.cargarTabla();
  }

  cargarTabla() {
    this.fechaHora = this.datePipe.transform(this.fechaA, 'yyyy-dd-MM') + " " + this.hora + ":00.000";
    this.mostrarTabla = true;
    this.hayDatos = true;
    this.movimiento.TRA_MOV_FECHA_MOVIMIENTO = this.fechaHora;
    this.movimiento.PUE_ID_PUESTO_MIGRATORIO = this.puesto;
    this.movimiento.TRA_MOV_TIPO_PASAJERO = this.tipoPas;
    this.movimiento.NAC_ID_DEST_PROC = this.procedencia;
    this.movimiento.TRA_ID_TRANSPORTE = this.idTransporte;
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
    this.fechaHora = this.datePipe.transform(this.fechaA, 'yyyy-dd-MM') + " " + this.hora;
    this.validos = true;
    const ventana = this.dialog.open(AgregarComponent, {
      width: '900px',
      disableClose: true,
      data: { idPuesto: this.puesto, fecha: this.fechaHora, idTransporte: this.idTransporte, procedencia: this.procedencia, tipoPasajero: this.tipoPas }
    });
    ventana.afterClosed()
      .subscribe(res => {
        this.cargarTabla();
      });
  }

  cancelar() {
    this.validos = false;
    this.resultado = false;
    this.hayDatos = true;
    this.formulario.reset();
    this.mostrarTabla = false;
  }

}
