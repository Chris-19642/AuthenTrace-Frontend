import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Usuario} from '../model/usuario';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrearCuentaService {

  private apiUrl = `${environment.apiURL}/usuario`;
  private httpClient = inject(HttpClient);
  constructor() {}

  registrarCuenta(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.apiUrl, usuario);
  }
}
