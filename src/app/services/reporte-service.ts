import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reporte } from '../model/reporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private http = inject(HttpClient);
  private url = `${environment.apiURL}/reportes`;

  constructor() {}

  // Listar reportes por usuario
  getReportesPorUsuario(idUsuario: number): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.url}/usuario/${idUsuario}`);
  }

  // Descargar reporte PDF
  descargarReporte(idReporte: number): Observable<Blob> {
    return this.http.get(`${this.url}/descargar/${idReporte}`, { responseType: 'blob' });
  }
}
