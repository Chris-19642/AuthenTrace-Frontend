import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Actualizacion} from '../model/actualizacion';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActualizacionService {
  private url = environment.apiURL;
  private httpClient = inject(HttpClient);
  constructor() {}
  programarActualizacion(actualizacion: Actualizacion): Observable<any> {
    return this.httpClient.post(this.url + "/actualizaciones/programar", actualizacion)
  }
  listarActualizaciones(): Observable<any[]> {
    return this.httpClient.get<Actualizacion[]>(environment.apiURL + '/actualizaciones/listar');
  }
}
