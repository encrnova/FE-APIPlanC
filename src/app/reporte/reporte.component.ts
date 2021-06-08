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
import { Solicitud } from '../modelos/solicitud.model';
import { MovimientoService } from '../servicios/movimiento.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ReporteComponent implements OnInit {
  columnas = ['fechaMov', 'puesto', 'tipoPas', 'procedencia', 'transporte', 'empresa', 'detalle'];
  datos = new MatTableDataSource();
  solicitud: Solicitud;
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
  verTbl: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    public acceso: Accesibilidad,
    private catalogoService: CatalogoService,
    private datosUsuario: DatosUsuario,
    private usuarioAuth: UsuarioAuthService,
    private movService: MovimientoService,
    private auth: Autenticacion,
    private pag: Paginacion) {
    this.pag.textoPaginacion();
  }

  ngOnInit(): void {
    this.solicitud = new Solicitud();
    this.buscador();
  }

  buscador() {
    this.rangoFecha = new FormGroup({
      inicio: new FormControl(),
      fin: new FormControl(),
    });

  }

  cargarPorFecha() {
    this.solicitud.FECHA_INICIO = this.rangoFecha.get('inicio').value;
    this.solicitud.FECHA_FINAL = this.rangoFecha.get('fin').value;
    this.cargarTabla(this.solicitud);
  }

  cargarTabla(solicitud: Solicitud) {
    this.movService.obtenerPorFecha(this.solicitud)
      .subscribe(res => {
        this.verTbl = true;
        this.cargando = false;
        this.datos.data = res;
        this.datos.paginator = this.paginator;
        this.contador = res;
        ('cargar' + this.contador);
        if (this.contador.length == 0) {
          this.hayDatos = false;
        }
      },
        error => {
          this.cargando = false;
          if (error.status === 0 || error.status === 401) {
            this.auth.autenticacion().then(() => { this.cargarTabla(solicitud); });
          }
          else
            console.log('Se produjo un error mientras se intentaba recuperar citas' + error);
        });
  }

  noFecha() {
    this.rangoFecha.reset();
    window.location.reload();
  }

}
