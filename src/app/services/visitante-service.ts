import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Visitante} from '../model/visitante';

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
