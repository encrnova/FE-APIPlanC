import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Movimiento } from '../modelos/movimiento.model';
import { Solicitud } from '../modelos/solicitud.model';
import { ConexionWebapiService } from './conexion-webapi.service';

@Injectable({
  providedIn: 'root'
})

export class MovimientoService {
  private apiUrl = ConexionWebapiService.apiURL;
  readonly url = this.apiUrl + "/Movimiento";
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  obtener(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.url);
  }

  obtenerPorMov(mov: Movimiento): Observable<Movimiento[]> {
    let json = JSON.stringify(mov);
    return this.http.post<Movimiento[]>(this.url + '/xMovimiento', json, { headers: this.headers })
  }

  obtenerPorFecha(sol: Solicitud, usuario: string): Observable<Solicitud[]> {
    let json = JSON.stringify(sol);
    return this.http.post<Solicitud[]>(this.url + '/xFecha/' + usuario, json, { headers: this.headers })
  }

  insertar(usuario: string, mov: Movimiento) {
    let json = JSON.stringify(mov);
    return this.http.post(this.url + '/' + usuario, json, { headers: this.headers })
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
