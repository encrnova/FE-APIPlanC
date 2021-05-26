import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { UsuarioAuth } from '../modelos/usuario-auth.model';
import { ConexionWebapiService } from './conexion-webapi.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})

export class UsuarioAuthService {
  private apiUrl = ConexionWebapiService.apiURL;
  readonly url = this.apiUrl + "/login";

  constructor(private http: HttpClient) { }

  autenticar(usuarioToken: UsuarioAuth) {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'POST',
      'Content-Type': 'application/json',
      'No-Auth': "True",
    });
    let json = JSON.stringify(usuarioToken);
    return this.http.post(this.url + '/authenticate', json, { headers: headers })
  }

  handleError(error: Response) {
    return throwError(error);
  }
}
