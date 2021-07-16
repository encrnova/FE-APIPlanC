import Swal from 'sweetalert2';
import { DatePipe, Time } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { DatosUsuario } from 'src/app/generales/datos-usuario';
import { Autenticacion } from 'src/app/seguridad/autenticacion';
import { Pais } from 'src/app/modelos/pais.model';
import { Movimiento } from 'src/app/modelos/movimiento.model';
import { MovimientoService } from 'src/app/servicios/movimiento.service';
import { CatalogoService } from 'src/app/servicios/catalogo.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
  providers: [DatePipe]
})

export class AgregarComponent implements OnInit {
  fechaInicial = new Date(1956, 0, 1);
  fechaMaxima: Date;
  listaPais: Pais[];
  documento: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  fechaNac: Date;
  nacionalidad: string;
  sexo: string;
  movimiento: Movimiento;
  fecha: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AgregarComponent>,
    private datosUsuario: DatosUsuario,
    private movService: MovimientoService,
    public catalogoService: CatalogoService) { }

  formulario = new FormGroup({
    documento: new FormControl(),
    nombre: new FormControl(),
    apellido1: new FormControl(),
    apellido2: new FormControl(),
    fechaNac: new FormControl(),
    nacionalidad: new FormControl(),
    sexo: new FormControl(),
  });

  ngOnInit(): void {
    this.movimiento = new Movimiento();
    this.catalogoService.obtenerPaises()
      .subscribe(res => {
        this.listaPais = res;
      });
  }

  guardar() {
    this.movimiento.PUE_ID_PUESTO_MIGRATORIO = this.data.idPuesto;
    this.movimiento.TRA_MOV_FECHA_MOVIMIENTO = this.data.fecha;
    this.movimiento.TRA_ID_TRANSPORTE = this.data.idTransporte;
    this.movimiento.NAC_ID_DEST_PROC = this.data.procedencia;
    this.movimiento.TRA_MOV_DOCUMENTO = this.documento;
    this.movimiento.NAC_ID = this.nacionalidad;
    this.movimiento.TRA_MOV_FECHA_NACIMIENTO = this.fechaNac;
    this.movimiento.TRA_MOV_NOMBRE = this.nombre;
    this.movimiento.TRA_MOV_PRIMER_APELLIDO = this.apellido1;
    this.movimiento.TRA_MOV_SEGUNDO_APELLIDO = this.apellido2;
    this.movimiento.TRA_MOV_SEXO = this.sexo;
    this.movimiento.TRA_MOV_TIPO_PASAJERO = this.data.tipoPasajero;
    this.movService.insertar(this.datosUsuario.usuarioId, this.movimiento)
      .subscribe(res => {

        Swal.fire({
          icon: 'warning',
          title: 'Agregar Pasajero',
          text: '¿Está seguro que desea agregar al pasajero?',
          footer: 'Verifique que los datos son correctos, ya que una vez confirmada la acción no puede realizar modificaciones del registro.',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Registro insertado exitosamente.',
              showConfirmButton: false,
              timer: 2000
            });
            this.dialogRef.close(null);
          }
        });
      },
        error => {
          Swal.fire(
            'Error',
            error.error.Message,
            'error')
        });
  }

  cancelar() {
    this.dialogRef.close(null);
  }

}
