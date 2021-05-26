import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { ConexionWebapiService } from './conexion-webapi.service';
import { Usuario, UsuarioInterno } from '../modelos/usuario.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private apiUrl = ConexionWebapiService.apiURL;
  readonly url = this.apiUrl + "/login";

  constructor(private http: HttpClient) { }

  ingresar(usuario: Usuario): Observable<UsuarioInterno> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let json = JSON.stringify(usuario);
    return this.http.post<UsuarioInterno>(this.url + '/verificarUsuario', json, { headers: headers });
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
