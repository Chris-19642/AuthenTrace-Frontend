import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Visitante} from '../model/visitante';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitanteService {
  private url: any = environment.apiURL;
  private httpClient = inject(HttpClient);
  constructor() {}
  insert(visitante: Visitante): Observable<any>{
    return this.httpClient.post(this.url + "/visitantes", visitante)
  }
}
