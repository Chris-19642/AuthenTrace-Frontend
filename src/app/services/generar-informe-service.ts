import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { GenerarInforme } from '../model/generar-informe';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerarInformeService {
  private url = environment.apiURL;
  private httpClient = inject(HttpClient);
  private listaCambio: Subject<GenerarInforme[]> = new Subject();

  constructor() {}

  // Obtener reporte mensual (GET /api/reportes/mensual?mes=X&anio=Y)
  obtenerReporteMensual(mes: number, anio: number): Observable<GenerarInforme> {
    return this.httpClient.get<GenerarInforme>(
      `${this.url}/reportes/mensual?mes=${mes}&anio=${anio}`
    );
  }

  // Exportar reporte a PDF (si implementas el endpoint)
  exportarPDF(mes: number, anio: number): Observable<Blob> {
    return this.httpClient.get(
      `${this.url}/reportes/mensual/pdf?mes=${mes}&anio=${anio}`,
      { responseType: 'blob' }
    );
  }

  // Subject para notificar cambios
  getListaCambio(): Observable<GenerarInforme[]> {
    return this.listaCambio.asObservable();
  }

  setListaCambio(lista: GenerarInforme[]) {
    this.listaCambio.next(lista);
  }
}
