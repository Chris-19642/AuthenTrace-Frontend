import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Documento} from '../model/documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  private http = inject(HttpClient);
  private url = environment.apiURL + "/documentos";

  constructor() {}

  // Subir archivo temporal
  subirTemporal(file: File): Observable<string> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(this.url + "/subir", formData, { responseType: 'text' });
  }

  // Cancelar archivo temporal
  cancelarTemporal(nombreArchivo: string): Observable<string> {
    return this.http.delete(this.url + `/cancelar/${nombreArchivo}`, { responseType: 'text' });
  }

  // Guardar definitivo
  guardarDefinitivo(nombreArchivo: string, idUsuario: number): Observable<Documento> {
    const formData = new FormData();
    formData.append("nombreArchivo", nombreArchivo);
    return this.http.post<Documento>(this.url + `/guardar/${idUsuario}`, formData);
  }

  // Listar documentos por usuario
  listarPorUsuario(idUsuario: number): Observable<Documento[]> {
    return this.http.get<Documento[]>(this.url + `/usuario/${idUsuario}`);
  }
}
