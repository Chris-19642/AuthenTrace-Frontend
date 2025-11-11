import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Actualizacion} from '../model/actualizacion';

@Injectable({
  providedIn: 'root'
})
export class ActualizacionService {
  private url = environment.apiURL;
  private httpClient = inject(HttpClient);
  private listaCambio: Subject<Actualizacion[]> = new Subject();
  constructor() {}
  programarActualizacion(actualizacion: Actualizacion): Observable<any> {
    return this.httpClient.post(this.url + "/actualizaciones/programar", actualizacion)
  }
  listarActualizaciones(): Observable<any[]> {
    return this.httpClient.get<Actualizacion[]>(environment.apiURL + '/actualizaciones/listar');
  }
}
