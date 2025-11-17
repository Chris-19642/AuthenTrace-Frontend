import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {Alerta} from '../model/alerta';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private url = environment.apiURL;
  private httpClient = inject(HttpClient);
  private listaCambio: Subject<Alerta[]> = new Subject();
  constructor() {}

  registrar(alerta: Alerta): Observable<any> {
    return this.httpClient.post(this.url + "/alerta", alerta)
  }

  list(): Observable<Alerta[]> {
    console.log(this.url + "/alertas");
    return this.httpClient.get<Alerta[]>(this.url + "/alertas")
  }

  listId(alertaId: number): Observable<Alerta> {
    return this.httpClient.get<Alerta>(this.url + "/alerta/" + alertaId)
  }

  delete(alertaId: number): Observable<any> {
    return this.httpClient.delete(this.url + "/alerta/" + alertaId)
  }

  listarPorUsuario(idUsuario: number): Observable<Alerta[]> {
    return this.httpClient.get<Alerta[]>(this.url + "/alertas/usuario/" + idUsuario)
  }

  listarPorEstado(estado: string): Observable<Alerta[]> {
    return this.httpClient.get<Alerta[]>(this.url + "/alertas/estado/" + estado)
  }
}
