import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sesion} from '../model/sesion';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private url = environment.apiURL;
  private httpClient = inject(HttpClient);
  constructor() {}
  registrarSesion(sesion: Sesion): Observable<any> {
    return this.httpClient.post(this.url + "/sesion", sesion)
  }
  listarSesiones(): Observable<any[]> {
    return this.httpClient.get<Sesion[]>(environment.apiURL + '/sesiones');
  }
  borrarSesion(idSesion:number,idUsuario:number): Observable<any> {
    return this.httpClient.delete(this.url + `/sesion/${idUsuario}` + idSesion)
  }
}
