import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../modelos/pais.model';
import { ConexionWebapiService } from './conexion-webapi.service';

@Injectable({
  providedIn: 'root'
})

export class CatalogoService {
  private apiUrl = ConexionWebapiService.apiURL;
  readonly url = this.apiUrl + "/Catalogo";

  constructor(private http: HttpClient) { }

  obtenerPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.url + "/Nacionalidad");
  }

}
