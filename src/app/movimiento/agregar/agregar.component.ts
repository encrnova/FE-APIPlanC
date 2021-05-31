import Swal from 'sweetalert2';
import { Time } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { DatosUsuario } from 'src/app/generales/datos-usuario';
import { Autenticacion } from 'src/app/seguridad/autenticacion';
import { Pais } from 'src/app/modelos/pais.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarComponent>,
    private datosUsuario: DatosUsuario,
    private auth: Autenticacion
  ) { }

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
  }

  guardar(){
    
  }

  cancelar() {
    this.dialogRef.close(null);
  }

}
