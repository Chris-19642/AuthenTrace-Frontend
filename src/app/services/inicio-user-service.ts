import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class InicioUserService {
  private url = environment.apiURL + "/users";
  private httpClient = inject(HttpClient);
  constructor() {}

  getById(idUsuario: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.url + `/${idUsuario}`);
  }

}
