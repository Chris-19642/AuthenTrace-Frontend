import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {VerificacionResultado} from '../model/verificacion-resultado';

@Injectable({
  providedIn: 'root'
})

export class VerificacionService {
  private http = inject(HttpClient);
  private url = environment.apiURL + "/verificacion";

  constructor() {}
  verificarFirma(idDocumento: number, idUsuario: number): Observable<VerificacionResultado> {
    return this.http.get<VerificacionResultado>
    (this.url + `/firma?idDocumento=${idDocumento}&idUsuario=${idUsuario}`);
  }

}
